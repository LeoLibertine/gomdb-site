// ==========================================
// FLAPPY LEAF BACKEND - MongoDB Bintec 2024
// ==========================================

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
let db = null;
let playersCollection = null;

// Conectar a MongoDB
async function connectDB() {
    try {
        const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/flappy-bintec');
        await client.connect();
        console.log('✅ Conectado a MongoDB');
        
        db = client.db('flappy-bintec');
        playersCollection = db.collection('players');
        
        // Crear índice en email para búsquedas más rápidas
        await playersCollection.createIndex({ email: 1 }, { unique: true });
        await playersCollection.createIndex({ bestScore: -1 }); // Para el leaderboard
        
        console.log('📊 Base de datos lista');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        process.exit(1);
    }
}

// ==========================================
// RUTAS API
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        database: db ? 'Connected' : 'Disconnected'
    });
});

// 1. REGISTRO DE USUARIO
app.post('/api/register', async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Validaciones básicas
        if (!name || !email) {
            return res.status(400).json({ 
                error: 'Nombre y email son requeridos' 
            });
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Email inválido' 
            });
        }
        
        // Verificar si el email ya existe
        const existingPlayer = await playersCollection.findOne({ 
            email: email.toLowerCase() 
        });
        
        if (existingPlayer) {
            return res.status(400).json({ 
                error: 'Este email ya está registrado' 
            });
        }
        
        // Crear nuevo jugador
        const newPlayer = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            registeredAt: new Date(),
            bestScore: 0,
            totalGamesPlayed: 0,
            totalPlayTime: 0,
            lastPlayed: null,
            games: []
        };
        
        await playersCollection.insertOne(newPlayer);
        
        console.log(`🎮 Nuevo jugador registrado: ${name} (${email})`);
        
        res.status(201).json({
            success: true,
            player: {
                name: newPlayer.name,
                email: newPlayer.email,
                bestScore: newPlayer.bestScore,
                totalGamesPlayed: newPlayer.totalGamesPlayed
            }
        });
        
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ 
            error: 'Error al registrar usuario' 
        });
    }
});

// 2. LOGIN DE USUARIO
app.post('/api/login', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                error: 'Email es requerido' 
            });
        }
        
        // Buscar jugador
        const player = await playersCollection.findOne({ 
            email: email.toLowerCase() 
        });
        
        if (!player) {
            return res.status(404).json({ 
                error: 'Email no registrado. Por favor regístrate primero.' 
            });
        }
        
        // Actualizar última conexión
        await playersCollection.updateOne(
            { email: email.toLowerCase() },
            { $set: { lastLogin: new Date() } }
        );
        
        console.log(`👤 Login: ${player.name} (${email})`);
        
        res.json({
            success: true,
            player: {
                name: player.name,
                email: player.email,
                bestScore: player.bestScore,
                totalGamesPlayed: player.totalGamesPlayed,
                registeredAt: player.registeredAt
            }
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            error: 'Error al iniciar sesión' 
        });
    }
});

// 3. GUARDAR PARTIDA
app.post('/api/save-game', async (req, res) => {
    try {
        const { email, score, duration } = req.body;
        
        if (!email || score === undefined || duration === undefined) {
            return res.status(400).json({ 
                error: 'Email, score y duration son requeridos' 
            });
        }
        
        // Crear objeto de juego
        const gameData = {
            score: parseInt(score),
            playedAt: new Date(),
            duration: parseInt(duration) // en segundos
        };
        
        // Buscar jugador actual
        const currentPlayer = await playersCollection.findOne({ 
            email: email.toLowerCase() 
        });
        
        if (!currentPlayer) {
            return res.status(404).json({ 
                error: 'Jugador no encontrado' 
            });
        }
        
        // Preparar actualización
        const updateData = {
            $push: { games: gameData },
            $inc: { 
                totalGamesPlayed: 1,
                totalPlayTime: parseInt(duration)
            },
            $set: { lastPlayed: new Date() }
        };
        
        // Actualizar mejor puntuación si es necesario
        if (score > currentPlayer.bestScore) {
            updateData.$set.bestScore = parseInt(score);
            console.log(`🏆 ¡Nuevo récord! ${currentPlayer.name}: ${score} puntos`);
        }
        
        // Actualizar jugador
        const result = await playersCollection.findOneAndUpdate(
            { email: email.toLowerCase() },
            updateData,
            { returnDocument: 'after' }
        );
        
        console.log(`🎮 Partida guardada: ${currentPlayer.name} - Score: ${score}, Tiempo: ${duration}s`);
        
        res.json({
            success: true,
            player: {
                name: result.name,
                email: result.email,
                bestScore: result.bestScore,
                totalGamesPlayed: result.totalGamesPlayed,
                totalPlayTime: result.totalPlayTime
            },
            isNewRecord: score > currentPlayer.bestScore
        });
        
    } catch (error) {
        console.error('Error guardando partida:', error);
        res.status(500).json({ 
            error: 'Error al guardar la partida' 
        });
    }
});

// 4. OBTENER LEADERBOARD
app.get('/api/leaderboard', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const topPlayers = await playersCollection
            .find({ bestScore: { $gt: 0 } })
            .sort({ bestScore: -1 })
            .limit(limit)
            .project({
                name: 1,
                email: 1,
                bestScore: 1,
                totalGamesPlayed: 1,
                _id: 0
            })
            .toArray();
        
        console.log(`📊 Leaderboard solicitado - Top ${limit}`);
        
        res.json(topPlayers);
        
    } catch (error) {
        console.error('Error obteniendo leaderboard:', error);
        res.status(500).json({ 
            error: 'Error al obtener el ranking' 
        });
    }
});

// 5. OBTENER ESTADÍSTICAS DE UN JUGADOR
app.get('/api/player-stats/:email', async (req, res) => {
    try {
        const email = req.params.email;
        
        const player = await playersCollection.findOne({ 
            email: email.toLowerCase() 
        });
        
        if (!player) {
            return res.status(404).json({ 
                error: 'Jugador no encontrado' 
            });
        }
        
        // Calcular estadísticas adicionales
        const stats = {
            name: player.name,
            email: player.email,
            bestScore: player.bestScore,
            totalGamesPlayed: player.totalGamesPlayed,
            totalPlayTime: player.totalPlayTime,
            averagePlayTime: player.totalGamesPlayed > 0 
                ? Math.round(player.totalPlayTime / player.totalGamesPlayed) 
                : 0,
            registeredAt: player.registeredAt,
            lastPlayed: player.lastPlayed,
            recentGames: player.games.slice(-10).reverse() // Últimas 10 partidas
        };
        
        // Calcular promedio de puntuación
        if (player.games.length > 0) {
            const totalScore = player.games.reduce((sum, game) => sum + game.score, 0);
            stats.averageScore = Math.round(totalScore / player.games.length);
        } else {
            stats.averageScore = 0;
        }
        
        // Obtener posición en el ranking
        const position = await playersCollection.countDocuments({
            bestScore: { $gt: player.bestScore }
        }) + 1;
        stats.globalRank = position;
        
        res.json(stats);
        
    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ 
            error: 'Error al obtener estadísticas' 
        });
    }
});

// 6. ESTADÍSTICAS GLOBALES DEL EVENTO
app.get('/api/event-stats', async (req, res) => {
    try {
        const totalPlayers = await playersCollection.countDocuments();
        
        const aggregateStats = await playersCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalGames: { $sum: "$totalGamesPlayed" },
                    totalTime: { $sum: "$totalPlayTime" },
                    avgBestScore: { $avg: "$bestScore" },
                    maxScore: { $max: "$bestScore" }
                }
            }
        ]).toArray();
        
        const stats = aggregateStats[0] || {
            totalGames: 0,
            totalTime: 0,
            avgBestScore: 0,
            maxScore: 0
        };
        
        // Jugador con mejor puntuación
        const topPlayer = await playersCollection
            .findOne({}, { sort: { bestScore: -1 } });
        
        res.json({
            totalPlayers,
            totalGamesPlayed: stats.totalGames,
            totalPlayTime: stats.totalTime,
            averageBestScore: Math.round(stats.avgBestScore),
            highestScore: stats.maxScore,
            champion: topPlayer ? {
                name: topPlayer.name,
                score: topPlayer.bestScore
            } : null,
            lastUpdated: new Date()
        });
        
        console.log('📈 Estadísticas del evento solicitadas');
        
    } catch (error) {
        console.error('Error obteniendo estadísticas del evento:', error);
        res.status(500).json({ 
            error: 'Error al obtener estadísticas del evento' 
        });
    }
});

// 7. RESET DE DATOS (solo para desarrollo/testing)
if (process.env.NODE_ENV === 'development') {
    app.delete('/api/reset-player/:email', async (req, res) => {
        try {
            const email = req.params.email;
            
            await playersCollection.updateOne(
                { email: email.toLowerCase() },
                {
                    $set: {
                        bestScore: 0,
                        totalGamesPlayed: 0,
                        totalPlayTime: 0,
                        games: []
                    }
                }
            );
            
            res.json({ success: true, message: 'Estadísticas reseteadas' });
            
        } catch (error) {
            console.error('Error reseteando jugador:', error);
            res.status(500).json({ error: 'Error al resetear' });
        }
    });
}

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// 404 para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint no encontrado' 
    });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor' 
    });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

async function startServer() {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log('🚀 Servidor corriendo en puerto', PORT);
        console.log(`📍 URL: http://localhost:${PORT}`);
        console.log('🎮 Flappy Leaf Backend - MongoDB Bintec 2024');
        console.log('=====================================');
    });
}

startServer().catch(console.error);
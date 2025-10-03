# 🎮 Flappy Leaf Backend - MongoDB Bintec 2024

## 🚀 Instalación Rápida

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar MongoDB

#### Opción A: MongoDB Local
```bash
# Instalar MongoDB localmente
# Crear base de datos: flappy-bintec
```

#### Opción B: MongoDB Atlas (Recomendado)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Obtener connection string
4. Agregarlo al archivo `.env`

### 3. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tu connection string
```

### 4. Ejecutar el servidor
```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

## 📡 Endpoints API

### Autenticación y Registro

#### `POST /api/register`
Registra un nuevo jugador
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com"
}
```

#### `POST /api/login`
Inicia sesión
```json
{
  "email": "juan@email.com"
}
```

### Juego

#### `POST /api/save-game`
Guarda una partida
```json
{
  "email": "juan@email.com",
  "score": 42,
  "duration": 120
}
```

#### `GET /api/leaderboard`
Obtiene el top 10 de jugadores
```
/api/leaderboard?limit=10
```

### Estadísticas

#### `GET /api/player-stats/:email`
Estadísticas detalladas de un jugador
```
/api/player-stats/juan@email.com
```

#### `GET /api/event-stats`
Estadísticas globales del evento

## 🗄️ Estructura de la Base de Datos

### Colección: `players`

```javascript
{
  _id: ObjectId,
  name: "String",
  email: "String (unique)",
  registeredAt: Date,
  bestScore: Number,
  totalGamesPlayed: Number,
  totalPlayTime: Number,
  lastPlayed: Date,
  games: [
    {
      score: Number,
      playedAt: Date,
      duration: Number
    }
  ]
}
```

## 🔒 Índices

- `email`: Índice único para búsquedas rápidas
- `bestScore`: Índice descendente para el leaderboard

## 📊 Monitoreo

Durante el evento, puedes monitorear en tiempo real:

```bash
# Ver logs del servidor
pm2 logs

# Ver estadísticas del evento
curl http://localhost:3000/api/event-stats

# Ver top 10
curl http://localhost:3000/api/leaderboard
```

## 🚨 Troubleshooting

### Error de conexión a MongoDB
- Verificar connection string en `.env`
- Verificar que MongoDB esté corriendo
- En Atlas: verificar IP whitelist

### Puerto en uso
- Cambiar PORT en `.env`
- O matar proceso: `lsof -i :3000`

## 📈 Métricas del Evento

El backend registra automáticamente:
- Total de jugadores registrados
- Partidas totales jugadas
- Tiempo total de juego
- Puntuación más alta
- Promedio de puntuaciones

## 🛠️ Desarrollo

### Estructura del código
```
index.js
├── Configuración (Express, CORS)
├── Conexión MongoDB
├── Rutas API
│   ├── /register
│   ├── /login
│   ├── /save-game
│   ├── /leaderboard
│   ├── /player-stats
│   └── /event-stats
└── Manejo de errores
```

### Testing local
```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'
```

## 📝 Notas para el Evento Bintec

- El backend está optimizado para manejar múltiples jugadores simultáneos
- Los datos se actualizan en tiempo real
- El leaderboard se actualiza automáticamente
- No hay límite de partidas por jugador durante los 3 días

## 🤝 Soporte

Para soporte durante el evento:
- MongoDB Bintec Team
- Slack: #flappy-leaf-support
# Presentacion Completa para Juan Carlos Sepulveda
## Query Model: Evolucion Estrategica — De Contingencia a Capa Transaccional Permanente

---

## 1. Contexto: Por que estamos aqui

Bancolombia vivio un evento de contingencia significativo donde el core bancario (iSeries) tuvo una caida importante. Durante ese evento, el Query Model — una capa de datos construida sobre MongoDB Atlas — fue el componente que sostuvo las consultas de los canales digitales del banco. Eso fue un exito. Los clientes pudieron seguir consultando saldos y movimientos porque la informacion estaba replicada en MongoDB.

Ese evento cambio la percepcion del Query Model dentro del banco. Paso de ser un componente "tactico" de contingencia a ser reconocido como una pieza estrategica. Jaime Villegas (VP) vio los resultados y dijo: "Esto funciono, metamos mas cosas al Query Model". Pero la vision correcta no es "meter por meter" — es escalar con proposito hacia una arquitectura de datos moderna.

Hoy, Juan Carlos Sepulveda, como lider de datos e integracion del banco, es el owner estrategico de este componente. El tiene la responsabilidad de definir como el Query Model evoluciona y como se gobierna la data que vive ahi. Esta presentacion es para alinear la vision tecnica de MongoDB con la vision estrategica que Sepulveda tiene para los datos del banco.

---

## 2. Los Tres Pilares de la Estrategia de Datos de Bancolombia

Dentro del banco se han definido tres pilares fundamentales a nivel de datos. Entender esto es clave porque el Query Model no es un componente aislado — es uno de estos tres pilares:

### Pilar 1: CDP (Customer Data Platform) — Capa Analitica
Es la capa donde se concentra la informacion para temas de analitica, reporteria, inteligencia artificial, machine learning. Aqui llega informacion de todos los productos y dominios del banco. Es lo que internamente llaman "la isleta" o data lake. Todos los datos viajan hacia alla para analisis transversal. Aqui es donde tiene mas sentido habilitar capacidades de IA generativa, Vector Search, consultas con lenguaje natural, etc. ya que es el lugar donde confluye toda la informacion.

### Pilar 2: Data Access Layer — Capa Operacional
Es la capa de acceso a datos, enfocada en como se expone la informacion para la operacion del banco. APIs, servicios, integraciones operativas. Es la forma en que los sistemas internos consumen y comparten datos entre si.

### Pilar 3: Query Model — Capa Transaccional
Es la capa transaccional a nivel de datos. Recoge los datos directamente del core bancario y permite consultas directas en tiempo real. Es la capa que atiende a los canales digitales (app, web) cuando un cliente quiere ver su saldo, sus movimientos, el estado de su cuenta. Esta es la capa donde MongoDB Atlas juega el rol principal.

**Mensaje clave para Sepulveda:** El Query Model no es un parche de contingencia. Es uno de los tres pilares de la estrategia de datos. Y como tal, necesita una vision, un gobierno y una arquitectura que escalen a nivel de toda la organizacion.

---

## 3. La Situacion Actual del Query Model

### Que es el Query Model hoy
El Query Model actual es una base de datos MongoDB Atlas que contiene informacion replicada desde el core bancario (iSeries). Su funcion principal hasta hoy ha sido servir como capa de consulta para los canales digitales del banco.

### Como funciona
1. Los datos del core bancario (iSeries/DB2) se extraen mediante un **CDC Extractor** (herramienta de captura de cambios en tiempo real)
2. Esos eventos de cambio se envian a **Kafka** (bus de mensajeria/eventos)
3. Un **Stream Processor** transforma y enriquece esos datos
4. Los datos transformados se guardan en **MongoDB Atlas** (el Query Model)
5. Los canales digitales (app movil, web) consultan directamente a MongoDB

**Nota importante:** Usamos nombres genericos para los componentes (CDC Extractor, Stream Processor) porque los componentes especificos pueden cambiar. Lo importante es la funcion que cumplen, no la herramienta particular.

### Que datos tiene
- Depositos (saldos de cuentas)
- Movimientos de cuentas
- Materializa la informacion para lecturas de canales digitales

### Como se replica
Hay dos naturalezas de replicacion:
- **Tiempo real**: CDC en tiempo real, sincronizando todo el dia, todo el tiempo. Principalmente movimientos — cuando un cliente hace un movimiento en su cuenta, se replica inmediatamente
- **Batch**: Un proceso batch que envia informacion complementaria (no la misma informacion, sino datos adicionales como descripciones, metadata complementaria)

### Que paso durante la contingencia
- El QM fue el path primario: Cuando se cayo el core, los canales digitales siguieron funcionando consultando MongoDB
- El volumen transaccional fue 3-4X mayor al normal sobre el Query Model
- MongoDB funciono de manera normal, sin problemas de rendimiento
- Resultado: Feedback positivo del banco sobre el funcionamiento de MongoDB

### Que falta en el QM actual
- **Post-review pendiente**: No se ha hecho una revision profunda de las colecciones, modelo de datos e indices del QM actual. MongoDB propone correr un MMS (script no intrusivo) para extraer informacion del cluster y generar recomendaciones
- **Modelo canonico por dominio**: Falta definir un modelo canonico claro — como se nombran los datos, como se estructuran, como se estandarizan entre dominios
- **Arquitectura actualizada**: Los diagramas de arquitectura que existen tienen nombres de componentes desactualizados o incorrectos
- **Ownership reciente**: Sepulveda recien heredo el QM — antes no habia un owner claro del componente

---

## 4. Los Dos Tracks del Query Model

Esta es la parte mas importante de entender. No hay un solo Query Model — hay dos tracks paralelos que eventualmente convergen:

### Track 1: QM de Contingencia → Acceso Permanente en Tiempo Real

**De donde viene:** Este es el QM que ya existe. Nacio como una capa de contingencia — "si el core se cae, que los clientes puedan seguir consultando sus saldos y movimientos".

**Hacia donde va:** Esta evolucionando para dejar de ser solo contingencia. La vision es que se convierta en una capa de acceso permanente en tiempo real. Es decir, no solo funciona cuando el core se cae — funciona SIEMPRE como el path principal de lectura para canales digitales.

**Que cubre:** Principalmente depositos, que es el producto mas grande del banco (~20-25 millones de cuentas).

**Pipeline actual:**
```
iSeries (DB2) → CDC Extractor → Kafka → Stream Processor → MongoDB Atlas
```

**Evoluciones planificadas:**
- Habilitar mas saldos y productos en el QM de contingencia
- Mejorar la latencia de replicacion para que sea verdaderamente real-time
- Optimizar el componente que "esta pegando muy duro a la base de datos" (hay un componente actual que genera carga excesiva y se esta escalando por encima de lo necesario mientras se optimiza)
- Post-review del modelo de datos actual para identificar mejoras

**Lo que internamente llaman "misiones":** Dentro del banco hay una estrategia de "misiones" — son aproximadamente 13 iniciativas enfocadas en preparar al banco para otro evento de contingencia. Cubren canales, producto, transacciones, consultas de bases de datos, y muchas cosas mas. El QM de contingencia es una pieza central de varias de estas misiones.

**Contexto politico importante:** Hay dos lineas estrategicas en el banco:
- **Linea del CIO (Fidel)**: Enfocada en no dejar que el negocio se caiga otra vez. "No puedo dejar al negocio que se caiga otra vez." Su enfoque es habilitar mas capacidades de contingencia lo mas rapido posible
- **Linea del CTO (Alvaro Carmona)**: Enfocada en disponibilidad cien por ciento y modernizacion tecnologica

Ambas lineas tienen interes en el QM pero a veces con perspectivas diferentes. Sepulveda, como lider de datos, necesita navegar ambas visiones y alinearlas hacia una sola estrategia.

### Track 2: QM Core Bancario Modernizado (Nuevo Core — Empieza con Bonos)

**De donde viene:** El banco esta modernizando su core bancario. Esta construyendo un core de cuarta generacion que reemplazara gradualmente al iSeries. El primer producto que se esta modernizando es Bonos.

**La filosofia:** "Lo que estamos haciendo en Bonos sienta las bases para todos los demas productos." Bonos no es solo un producto mas — es la semilla. Es el riel que se esta armando para que todo lo que venga a traves del core de cuarta generacion llegue bien.

**Que significa esto en la practica:**
- Se estan definiendo las reglas del juego: modelo de datos, estructura de colecciones, APIs, patrones de acceso
- Cuando llegue Inversion Virtual, no va a haber que cambiar nada
- Cuando llegue CDT, no va a haber que cambiar nada
- Cuando llegue Depositos al nuevo core, tampoco
- Cada producto nuevo simplemente se "sube a los rieles" que Bonos esta definiendo

**Pipeline nuevo:**
```
Nuevo Core Bancario → CDC Extractor → Kafka → Stream Processor → MongoDB Atlas
```

**Colecciones definidas:**
1. **Cuentas** (Account State): Contiene el estado actual de cada cuenta — saldo, tipo de producto, estado, parametros
   - Indice principal: `_id` (cuenta)
   - Indice secundario: `parameters.mdmKey` (la llave MDM es el identificador unico de una persona en el banco)
   
2. **Postings** (Movimientos): Contiene cada movimiento individual de cada cuenta
   - Indice principal: `accountId` (todos los movimientos de una cuenta se agrupan por cuenta)
   - Indice secundario: `requestId`
   - Nota: El account ID es la llave de particionamiento — todos los movimientos de una cuenta van al mismo lugar

3. **Snapshots de Saldos Diarios** (NUEVA — recientemente identificada):
   - Historico de saldos por dia por cuenta
   - Ventana de ~60 dias
   - ~20-30 millones de cuentas
   - Uso principal: Procesos de conciliacion y sincronizacion — garantizar que la informacion esta replicada correctamente entre las diferentes partes. Ejemplo: validar que el saldo que termino ayer en el QM coincide con lo que autorizo el core
   - Uso secundario: Reporteria legal (ejemplo: a fin de ano, cual fue el saldo de cada cuenta)
   - Problema actual: La coleccion de cuentas entrega el balance actual, pero si se consulta a medianoche durante un movimiento, puede traer un saldo incorrecto. Los snapshots resuelven esto al tener una foto fija del saldo al cierre de cada dia

**Modelo de datos — Separacion por dominio:**
El nuevo core tiene una arquitectura clara de capas:
- **Capa de Sistema**: Donde viven los cores de cada producto (core bancario, tarjetas, informacion del cliente)
- **Capa de Composicion/Producto**: Donde los productos orquestan operaciones
- **Capa de Experiencia**: Donde los canales digitales interactuan con el usuario

El QM del Core Bancario vive en la capa de sistema. Tiene un modelo de cuenta y de movimientos estandarizado que es comun a TODOS los productos. Si un producto como Bonos necesita datos adicionales especificos (serie, emision, plazo, etc.), esos datos viven en el dominio del producto, no en el QM. El QM se enfoca en la cuenta, el saldo y los movimientos — que es lo transversal.

**Diferencia con el QM de contingencia:** Aunque ambos manejan cuentas, saldos y movimientos, la ESTRUCTURA de los documentos es diferente:
- El QM de contingencia esta muy atado al formato de iSeries/DB2 — hereda la estructura del core viejo
- El QM modernizado tiene una especificacion nueva, pensada como producto financiero, con un modelo canonico definido desde cero
- No son compatibles directamente — por eso coexisten como dos bases de datos separadas por un tiempo

### Donde estan hoy (Fase de Desarrollo)
- El primer producto (Bonos) ya esta en desarrollo
- Tienen un cluster M30 en MongoDB Atlas desplegado en ambiente de desarrollo
- Estan probando con Bonos, que es un producto pequeno (~100-120K cuentas, ~120 movimientos/dia)
- Planean subir a M50 o M40 cuando ya esten en produccion con carga real
- Estan evaluando el tema de sharding (particionamiento de datos)

---

## 5. La Convergencia — Como los Dos Tracks se Vuelven Uno

Esta es la vision a futuro y lo mas importante para Sepulveda como owner de la estrategia:

### Roadmap de Convergencia

| Fase | Periodo estimado | Track Contingencia | Track Modernizado | Estado |
|------|-----------------|-------------------|-------------------|--------|
| **Actual** | Hoy | Activo — soporta depositos en modo contingencia/real-time | Bonos en desarrollo | Dos tracks separados |
| **Fase 1** | Proximo trimestre | Evolucionando — habilitando mas saldos y productos, mejorando latencia | Bonos en produccion | Coexisten independientes |
| **Fase 1.5** | ~6-9 meses | Sigue activo | Bonos + Inversion Virtual + CDT | QM modernizado crece |
| **Tiempo Real** | ~1 ano | Se habilita autorizacion en tiempo real como capacidad transversal | Se integra al mismo modelo | Empiezan a conectarse |
| **Fase 2** | 1-2 anos | Empieza a reducir scope | Depositos migra al nuevo core — el grueso llega (~20-25M cuentas) | Transicion |
| **Final** | Post-migracion depositos | Se APAGA | QM unificado — todos los productos en una sola arquitectura | Un solo QM |

### Que pasa cuando convergen
- El QM de contingencia deja de existir porque la informacion que tenia ahora vive en el QM modernizado
- Simplemente se apunta a los canales digitales al nuevo QM
- No hay que migrar datos — los datos de depositos llegan frescos desde el nuevo core
- El QM modernizado ya tiene la arquitectura, los rieles, el modelo canónico listo para recibir cualquier producto

### Por que no se pueden fusionar ahora
- El QM de contingencia tiene una estructura de datos muy amarrada al iSeries viejo
- El QM modernizado tiene una estructura nueva, pensada desde cero
- Mezclarlos ahora seria crear un hibrido problematico
- Lo correcto es que coexistan hasta que el core viejo se retire

---

## 6. Arquitectura Tecnica de Referencia

### Componentes del Pipeline (Nombres Genericos)

```
+-------------------+     +---------------+     +---------+     +------------------+     +----------------+
| Core Bancario     | --> | CDC Extractor | --> |  Kafka  | --> | Stream Processor | --> | MongoDB Atlas  |
| (iSeries o Nuevo) |     | (Captura de   |     | (Bus de |     | (Transformacion  |     | (Query Model)  |
|                   |     |  cambios)     |     | eventos)|     |  y enriquecimiento|    |                |
+-------------------+     +---------------+     +---------+     +------------------+     +----------------+
                                                                                              |
                                                                                              v
                                                                                    +------------------+
                                                                                    | Online Archive   |
                                                                                    | (S3 - datos      |
                                                                                    |  historicos)     |
                                                                                    +------------------+
```

### Que hace cada componente

1. **Core Bancario**: Es la fuente de verdad. Hoy es iSeries (DB2) para depositos. Para el core modernizado es una nueva plataforma. Aqui ocurren todas las transacciones — aperturas, depositos, retiros, etc.

2. **CDC Extractor**: Herramienta que captura cada cambio que ocurre en el core bancario en tiempo real. Cada vez que se modifica un registro (un nuevo movimiento, un cambio de saldo), el CDC lo detecta y lo envia como un evento. Son eventos atomicos — cada cambio es un evento individual.

3. **Kafka**: Bus de mensajeria que recibe todos los eventos de cambio. Actua como buffer y garantiza que ningun evento se pierda. Permite que multiples consumidores lean los mismos eventos.

4. **Stream Processor**: Toma los eventos de Kafka, los transforma al formato que necesita MongoDB (de formato relacional/DB2 a formato de documentos JSON), los enriquece si es necesario, y los escribe en MongoDB Atlas.

5. **MongoDB Atlas**: La base de datos documental donde viven los datos del Query Model. Arquitectura de 3 nodos (1 primario que recibe escrituras y lecturas, 2 secundarios que reciben replicas y pueden servir lecturas).

6. **Online Archive (S3)**: Despues de 3-6 meses, los datos frios se mueven automaticamente a Amazon S3. Se configura desde Atlas. Los datos van cifrados en reposo. Se puede consultar con Atlas Federation (mezclar datos calientes de Atlas + datos frios de S3 en una sola consulta). El S3 vive en la cuenta del banco — se puede mover o replicar a otro S3 del banco si necesitan tener control directo.

### Arquitectura de Nodos MongoDB Atlas

**Configuracion actual (QM Contingencia):**
- 1 cluster MongoDB Atlas
- 3 nodos: 1 Primario + 2 Secundarios
- Primario: Recibe escrituras (CDC) y lecturas (canales)
- Secundarios: Replicas de lectura — se pueden usar para reporteria o procesos batch para no impactar al primario

**Configuracion futura (QM Modernizado — Fase 2 con Sharding):**
- 2 Shards (particiones de datos)
- Cada shard: 3 nodos (1 Primario + 2 Secundarios) = 6 nodos total
- Router (mongos): Dirige las consultas al shard correcto
- Shard Key: `accountId` (hashed) — todos los movimientos de una cuenta van al mismo shard, las cuentas se distribuyen equitativamente entre shards

---

## 7. Sizing — Dimensionamiento por Fases

### Fase 1: Bonos + CDT + Inversion Virtual

| Metrica | Valor |
|---------|-------|
| Cuentas totales | ~1.1M (Bonos 100K + CDT 1M + Inv. Virtual) |
| Movimientos por dia | ~1.2M |
| Operaciones pico | Bajas (producto pequeno en Bonos) |
| Data en disco (comprimida) | ~180 GB |
| Cluster recomendado | M30 sin sharding |
| Nodos | 3 (1P + 2S) |
| Conexiones estimadas | Pocas (~100-500) |

**Por que M30:** Bonos es un producto pequeno. CDT e Inversion Virtual agregan volumen pero manejable. No necesita mas para la fase inicial.

### Fase 2: + Depositos + Todos los Productos

| Metrica | Valor |
|---------|-------|
| Cuentas totales | ~22-30M |
| Movimientos por dia | ~30-40M |
| Operaciones pico por segundo | 8,000 lecturas + 2,000 escrituras |
| Ratio | 70% lecturas / 30% escrituras |
| Data en disco (comprimida) | ~5 TB |
| Cluster recomendado | M50 con 2 shards (o M40 con 3 shards) |
| Nodos | 6 (2 shards x 3 nodos) |
| Conexiones estimadas | ~2,500 (50 pods x 50 conexiones) |
| Retencion hot | 3-6 meses |
| Archive | Online Archive a S3 despues de 3-6 meses |

**Por que sharding en Fase 2:** Con 30M+ de cuentas, 30-40M movimientos/dia y 10K ops/s en pico, un solo cluster no es suficiente. Sharding distribuye la carga entre multiples servidores.

**Estrategia de costos:** MongoDB maneja un modelo de creditos. Se puede negociar un precio especial reservando un estimado de consumo anual. Ejemplo: si el sizing anual va a ser 100 creditos, se puede negociar un costo especial por esos 100, y si se pasa, el costo unitario especial se mantiene para el excedente. No son instancias reservadas como AWS — son creditos de consumo.

### Cuando hacer el sharding
- **No ahora**: El volumen de Fase 1 es muy pequeno para justificar sharding
- **Antes de Fase 2**: Cuando se acerque la migracion de depositos, hay que implementar sharding
- **Plazo estimado**: Maximo 1 ano ya deberiamos estar pensando en sharding
- **Riesgo de esperar mucho**: Si hay mucho volumen de datos cuando se hace el sharding, la migracion se vuelve mas compleja y costosa
- **Recomendacion**: Definir el shard key ahora (durante el design review) aunque no se implemente todavia. Asi cuando se necesite, ya esta la decision tomada

---

## 8. Data Mesh y Data Products — La Vision Estrategica

Esto es especialmente relevante para Sepulveda porque alinea con la direccion que el banco esta tomando:

### Que es Data Mesh
Es un patron donde cada dominio de negocio (Depositos, Tarjetas, CDT, Bonos, etc.) es responsable de sus propios datos. No hay un monolito centralizado donde todo esta revuelto. Cada dominio:
- Define su propio modelo de datos (modelo canonico)
- Expone sus datos como un "producto de datos"
- Tiene ownership claro de sus datos
- Puede elegir la tecnologia mas adecuada para su caso de uso

### Que es Data Fabric
Es la capa centralizadora que provee la informacion donde debe estar. Tiene como base el data lake y permite que la informacion fluya entre dominios de manera gobernada.

### Como encaja el Query Model
El QM del core bancario es un data product del dominio de core bancario. Expone cuentas, saldos y movimientos como un servicio de consulta en tiempo real. Otros dominios pueden tener sus propios Query Models:
- QM de Tarjetas (otro dominio, otro QM con sus propias colecciones)
- QM de Seguros
- QM de Cartera
- Etc.

**Lo que NO queremos:** No queremos llegar al modelo donde una sola base de datos tiene todo. Eso es lo que duele tanto del iSeries actual — 1000 aplicaciones pegadas a la misma base de datos, y si modificas una tabla, tienes que revisar 80 procesos que dependen de ella.

**Lo que SI queremos:** Separacion clara por dominio. Cada dominio tiene sus datos, su responsabilidad. Si necesito escalar un dominio, escalo ese sin impactar los demas.

### El rol de Sepulveda en esto
Como lider de datos e integracion, Sepulveda define:
- La estrategia de gobierno de datos transversal
- El patron de arquitectura de referencia (CQRS como patron base)
- Cuales dominios usan que tecnologias
- Como se comparte informacion entre dominios
- El modelo canonico de datos

Su equipo de arquitectos tecnicos (Cristian Franco, Sergio, etc.) son los que bajan esas decisiones a implementacion. Pero la vision y las reglas vienen de Sepulveda.

---

## 9. Capacidades Habilitadas por el Query Model

### Capacidades actuales (QM Contingencia)
- Consulta de saldos en canales digitales
- Consulta de movimientos
- Contingencia ante caida del core
- Lecturas en tiempo real (CDC)

### Capacidades en evolucion (Track 1 - Mejoras al QM actual)
- **Acceso permanente en tiempo real**: El QM deja de ser solo contingencia — se convierte en el path principal de lectura
- **Mas productos habilitados**: Extender el QM para cubrir mas productos ademas de depositos
- **Optimizacion**: Mejorar el componente que genera carga excesiva, reducir la necesidad de escalar por encima de lo necesario

### Capacidades nuevas (Track 2 - QM Modernizado)
- **Autorizacion en tiempo real**: Una de las necesidades mas importantes. Mejorar el tiempo de respuesta en autorizaciones de operaciones. Cuando un cliente quiere hacer un debito, credito, o cualquier operacion con su cuenta, la autorizacion consulta el QM en lugar del core directamente. Esto es transversal a todos los productos
- **Disponibilidad alta**: Que los servicios del banco esten siempre disponibles, sin depender del core para cada consulta
- **Snapshots de conciliacion**: La nueva coleccion de saldos diarios para procesos de conciliacion contable
- **Modelo canonico**: Un solo modelo de datos que todos los productos nuevos van a usar. Reduce el time-to-market para nuevos productos
- **Online Archive**: Datos historicos en S3 despues de 3-6 meses, consultables con Atlas Federation si se necesitan

### Capacidades futuras (Post-convergencia)
- **Multi-region**: En evaluacion. No es prioridad a corto plazo pero se puede habilitar. MongoDB Atlas permite desplegar en multiples regiones. Hoy se manejan 3 nodos en una sola region (multi-zona)
- **Analytics en secundarios**: Usar los nodos secundarios para consultas analiticas sin impactar al primario
- **Inteligencia Artificial**: Una vez que los datos estan en MongoDB, se pueden habilitar embeddings y Vector Search para consultas con lenguaje natural, personalizacion, deteccion de fraude, etc. Esto tiene mas sentido en la capa de CDP (analitica), pero el QM puede alimentar esos procesos

---

## 10. Gobierno y Ownership — Quien es responsable de que

### Estado actual del ownership
- **Hoy**: El QM de contingencia sigue siendo operado, mantenido y gestionado por el equipo de Cores (Juan Esteban como lider del programa de Cores)
- **Transicion**: La idea es que datos (el equipo de Sepulveda) eventualmente reciba el QM — la infraestructura y los datos en reposo serian responsabilidad de esa area
- **No definido aun**: El alcance exacto de que recibe Sepulveda y que se queda en Cores no esta completamente definido. Se ha tocado en conversaciones pero falta aterrizar

### Modelo de responsabilidades propuesto

| Rol | Responsable | Alcance |
|-----|-------------|---------|
| Estrategia de datos | Juan Carlos Sepulveda | Gobierno, modelo canonico, patrones, lineamientos transversales |
| Definicion de arquitectura | Arquitectura Empresarial (Rafa, Dani, Cristian) | Bajar la estrategia a arquitecturas especificas por caso de uso |
| Implementacion | Equipo de Cores (Juan Esteban, Mauro, Saul) con apoyo de GFT | Construccion, despliegue, testing |
| Operacion dia a dia | Equipo de BD del banco (Oliver, equipo DBA) | Mantenimiento, monitoreo, soporte |
| Acompanamiento tecnico | MongoDB (Leo, Abby, equipo PS) | Design review, health checks, recomendaciones, best practices |
| Consumo y costos | Juan David Vergara | Gestion del contrato, consumo de creditos |

### Modelo de acompanamiento MongoDB
El acompanamiento de MongoDB funciona en tres fases:
1. **Pre-implementacion (Design Review)**: Leo + Abby + equipo industria (Saul/Rama) revisan la arquitectura, el modelo de datos, el sizing. Entregan recomendaciones antes de que se construya
2. **Durante implementacion**: El equipo de servicios profesionales apoya con expertise puntual. El banco implementa con su equipo (apoyo de GFT para temas puntuales), MongoDB valida que se sigan las mejores practicas
3. **Post-implementacion (Post Review/Health Check)**: Se revisa lo implementado. A nivel de infra (reportes de rendimiento) y a nivel de datos (colecciones, indices, modelo de datos). Se entrega un reporte de optimizacion

**Hay bolsa de horas disponible**: Se va a proponer un plan de trabajo de como usar esas horas. La recomendacion es enfocarse en lo que genera mas impacto y no gastarlas en cosas que el banco puede resolver de forma asincrona.

---

## 11. Proximos Pasos Concretos

### Inmediatos (proximas 2-4 semanas)
1. **Post-review del QM actual**: Correr el MMS en el cluster actual para obtener un reporte detallado de colecciones, indices, modelo de datos, rendimiento. Entregable: Reporte de optimizacion
2. **Design Review del QM modernizado (Bonos)**: Revisar el modelo de datos que se va a implementar, validar indices, validar que el diseno soporte la escala futura. Entregable: Reporte de Design Review con recomendaciones
3. **Actualizar documentacion de arquitectura**: Limpiar los diagramas con componentes correctos (nombres genericos), versionar

### Corto plazo (1-3 meses)
4. **Definir shard key**: Aunque no se implemente sharding ahora, dejar definido el shard key para que cuando se necesite, no haya que cambiar el modelo
5. **Implementar Bonos en produccion**: Subir de M30 de desarrollo a un cluster apropiado en produccion
6. **Definir modelo de la coleccion de snapshots**: Disenar la nueva coleccion de saldos diarios

### Mediano plazo (3-12 meses)
7. **Integrar CDT e Inversion Virtual**: Los proximos productos que se suben a los rieles de Bonos
8. **Habilitar autorizacion en tiempo real**: La capacidad transversal que mejora el performance de todas las operaciones
9. **Evaluar sharding**: Antes de que llegue el grueso de depositos, implementar sharding

### Largo plazo (1-2 anos)
10. **Migrar depositos al nuevo core**: Cuando esto ocurra, el QM modernizado absorbe el volumen completo
11. **Retirar QM de contingencia**: Una vez que depositos esta en el nuevo core, el QM viejo se apaga
12. **Evaluar multi-region**: Cuando el volumen y la criticidad lo justifiquen

---

## 12. Que pedimos / Que necesitamos de Sepulveda

1. **Validacion de la vision**: Que confirme que los dos tracks (contingencia → permanente + modernizacion) alinean con su estrategia de datos
2. **Accesos para el post-review**: Necesitamos que el equipo de Oliver nos facilite acceso al cluster actual para correr el diagnostico
3. **Top 5-10 consultas**: Las consultas mas frecuentes que hacen los canales al QM, para validar que el modelo de datos es optimo
4. **Definicion de gobierno**: Como quiere el manejar el ownership del QM — que queda en Cores, que pasa a Datos
5. **Lineamiento de Data Mesh**: Si la estrategia es descentralizar por dominios, que nos de ese lineamiento para que nuestras recomendaciones de arquitectura se alineen
6. **Prioridad de productos**: Despues de Bonos, en que orden entran los demas productos al QM modernizado

---

## Resumen Ejecutivo (Una pagina)

**El Query Model de Bancolombia es uno de los tres pilares de la estrategia de datos del banco** (junto con CDP y Data Access Layer). Hoy existen dos tracks: el QM de contingencia que soporto exitosamente la caida del core y esta evolucionando a capa permanente de acceso en tiempo real, y el QM modernizado que nace con el nuevo core bancario empezando por Bonos.

**Bonos es la semilla.** Lo que se construya ahi define los rieles para todos los productos futuros — CDT, Inversion Virtual, y eventualmente Depositos (~25M cuentas). Cuando Depositos migre al nuevo core, el QM de contingencia se retira y queda un solo QM unificado.

**La arquitectura es solida:** CDC Extractor captura cambios en tiempo real, Kafka transporta los eventos, un Stream Processor transforma y MongoDB Atlas almacena para consulta. Datos frios van a S3 despues de 3-6 meses. Para Fase 2 se contempla sharding con shard key por accountId.

**MongoDB esta comprometido con el acompanamiento:** Design Review previo a implementacion, Post-Review del QM actual, y apoyo continuo con la bolsa de horas existente. El objetivo es que cada decision tecnica este validada por expertos antes de implementarse.

**Lo que necesitamos de Sepulveda:** Validacion de la vision, lineamientos de gobierno y data mesh, y accesos para ejecutar el post-review del QM actual.

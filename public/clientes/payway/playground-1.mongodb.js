/* global sp */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Create a new stream processor.
// Procesador #1: Para las transacciones que SÍ cumplen las reglas de negocio
sp.createStreamProcessor(
  'procesador_validas',
  {
    source: {
      kafka: {
        connectionName: 'Confluent_Conecction',
        topic: 'transacciones_raw',
        pipeline: [
          {
            $match: {
              status: "APROBADA",
              moneda: "USD"
            }
          }
        ]
      }
    },
    sink: {
      atlas: {
        db: "payway",
        coll: "transacciones_validas"
      }
    }
  }
);

// More information on the `createStreamProcessor` command can be found at:
// https://www.mongodb.com/docs/atlas/atlas-sp/manage-stream-processor/#create-a-stream-processor

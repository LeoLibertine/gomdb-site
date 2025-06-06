export default function SegurosBolivar() {
    return (
      <div className="min-h-screen bg-white px-8 py-12">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Cliente: Seguros Bolívar</h1>
        <p className="text-gray-700 text-lg mb-4">
          Arquitectura propuesta para modernizar la plataforma de CienCuadras, migrando desde RDS Aurora y ElasticSearch hacia MongoDB Atlas.
        </p>
  
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Repositorio centralizado por producto (tarjeta, crédito, etc.)</li>
          <li>Búsqueda vectorial y retención de conversación</li>
          <li>Reducción de costos por licenciamiento de motores separados</li>
          <li>Soporte nativo para análisis, búsquedas y autoservicio de datos</li>
        </ul>
      </div>
    );
  }
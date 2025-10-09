document.addEventListener('DOMContentLoaded', () => {
    const startSimulationBtn = document.getElementById('startSimulation');
    const sendTransactionBtn = document.getElementById('sendTransaction');
    const transactionInput = document.getElementById('transactionInput');

    // Default valid transaction
    const defaultTransaction = {
        "transaccion_id": "asp_demo_001",
        "monto": 5000.00,
        "moneda": "MXN",
        "status": "APROBADA",
        "cliente": "cliente_demo_789"
    };

    transactionInput.value = JSON.stringify(defaultTransaction, null, 2);

    const steps = {
        kafka: document.getElementById('step-kafka'),
        asp: document.getElementById('step-asp'),
        mongoGood: document.getElementById('step-mongo-good'),
        mongoError: document.getElementById('step-mongo-error')
    };

    const arrows = {
        toAsp: document.querySelector('.flow-diagram .flow-arrow:nth-of-type(1)'),
        toMongoGood: document.querySelector('.good-path-arrow'),
        toMongoError: document.querySelector('.error-path-arrow')
    };

    const dataPreviews = {
        good: document.querySelector('.good-data'),
        error: document.querySelector('.error-data')
    };

    let simulationRunning = false;

    function resetSimulation() {
        Object.values(steps).forEach(step => step.classList.remove('active', 'highlight'));
        Object.values(arrows).forEach(arrow => arrow.classList.remove('active', 'highlight'));
        Object.values(dataPreviews).forEach(preview => {
            preview.classList.remove('active');
            preview.innerHTML = '';
        });
        simulationRunning = false;
    }

    async function simulateTransaction(transaction) {
        if (simulationRunning) return;
        simulationRunning = true;
        resetSimulation(); // Clear previous state

        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        // Step 1: Kafka Source receives transaction
        steps.kafka.classList.add('active');
        steps.kafka.classList.add('highlight');
        await delay(1000);
        steps.kafka.classList.remove('highlight');

        arrows.toAsp.classList.add('active');
        arrows.toAsp.classList.add('highlight');
        await delay(700);
        arrows.toAsp.classList.remove('highlight');

        // Step 2: Atlas Stream Processing starts
        steps.asp.classList.add('active');
        steps.asp.classList.add('highlight');
        await delay(1500); // Time for processing/validation

        // Simulate ASP logic: check if 'moneda' is 'MXN' and 'monto' > 0
        const isValid = transaction.moneda === "MXN" && transaction.monto > 0;

        steps.asp.classList.remove('highlight');

        if (isValid) {
            // Path 1: Valid transaction goes to transacciones_aprobadas
            arrows.toMongoGood.classList.add('active');
            arrows.toMongoGood.classList.add('highlight');
            await delay(700);
            arrows.toMongoGood.classList.remove('highlight');

            steps.mongoGood.classList.add('active');
            steps.mongoGood.classList.add('highlight');
            dataPreviews.good.classList.add('active');
            const processedTx = { ...transaction, processed_at: new Date().toISOString(), status_interno: "PROCESADA" };
            dataPreviews.good.innerHTML = `<pre>${JSON.stringify(processedTx, null, 2)}</pre>`;
            await delay(1500);
            steps.mongoGood.classList.remove('highlight');
        } else {
            // Path 2: Invalid transaction goes to transacciones_rechazadas (DLQ logic)
            arrows.toMongoError.classList.add('active');
            arrows.toMongoError.classList.add('highlight');
            await delay(700);
            arrows.toMongoError.classList.remove('highlight');

            steps.mongoError.classList.add('active');
            steps.mongoError.classList.add('highlight');
            dataPreviews.error.classList.add('active');
            const errorTx = { ...transaction, error: "Validación de moneda o monto fallida", processed_at: new Date().toISOString() };
            dataPreviews.error.innerHTML = `<pre>${JSON.stringify(errorTx, null, 2)}</pre>`;
            await delay(1500);
            steps.mongoError.classList.remove('highlight');
        }

        steps.asp.classList.remove('active'); // Deactivate ASP after processing
        simulationRunning = false;
    }

    startSimulationBtn.addEventListener('click', () => {
        try {
            const tx = JSON.parse(transactionInput.value);
            simulateTransaction(tx);
        } catch (e) {
            alert('JSON de transacción inválido: ' + e.message);
        }
    });

    sendTransactionBtn.addEventListener('click', () => {
        try {
            const tx = JSON.parse(transactionInput.value);
            simulateTransaction(tx);
        } catch (e) {
            alert('JSON de transacción inválido: ' + e.message);
        }
    });
});
async function fetchPayloads() {
    const res = await fetch('/payloads');
    const payloads = await res.json();
    const container = document.getElementById('payloads');
    if (payloads.length === 0) {
        container.innerHTML = '<p>No payloads received yet.</p>';
        return;
    }
    container.innerHTML = payloads.map((payload, index) => `
        <div style="margin-bottom: 10px;">
            <div><b>Payload ${index + 1}</b></div>
            <pre>${payload.data}</pre>
        </div>
    `).join('');
}

function clearPayloads() {
    fetch('/clear', { method: 'DELETE' })
        .then(() => fetchPayloads())
        .catch(err => console.error('Error clearing payloads:', err));
}

function toggleResponseCode() {
    fetch('/toggle-response-code', { method: 'POST' })
        .then(() => getConfig())
        .catch(err => alert('Failed to toggle response code'));
}

function getConfig() {
    fetch('/get-config')
        .then(res => res.json())
        .then(config => {
            const configDiv = document.getElementById('config');
            if (configDiv) {
                configDiv.innerText = `Current POST response code: ${config.responseCode}`;
            }
        })
        .catch(err => alert('Failed to fetch config'));
}

window.onload = () => {
    fetchPayloads();
    setInterval(fetchPayloads, 5000);
    getConfig();
};
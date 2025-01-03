function calculateTax() {
    const companyName = document.getElementById("companyName").value;
    const cnpj = document.getElementById("cnpj").value;
    const invoiceValue = parseFloat(document.getElementById("invoiceValue").value);
    const taxType = document.getElementById("taxType").value;

    // Validações
    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    if (!cnpjPattern.test(cnpj)) {
        alert("CNPJ no formato incorreto!");
        return;
    }
    if (invoiceValue <= 0) {
        alert("O valor da nota fiscal deve ser um número positivo!");
        return;
    }
    if (companyName === "") {
        alert("O campo Nome da Empresa deve ser preenchido!");
        return;
    }

    // Enviar dados para o backend
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("cnpj", cnpj);
    formData.append("invoiceValue", invoiceValue);
    formData.append("taxType", taxType);

    fetch("backend/index.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Exibição dos resultados
        const result = `
            <table border="1">
                <tr><th>Nome da Empresa</th><td>${data.companyName}</td></tr>
                <tr><th>CNPJ</th><td>${data.cnpj}</td></tr>
                <tr><th>Tipo de Imposto</th><td>${data.taxType}</td></tr>
                <tr><th>Valor Inicial</th><td>${data.invoiceValue}</td></tr>
                <tr><th>Valor do Imposto</th><td>${data.taxValue}</td></tr>
                <tr><th>Valor Final</th><td>${data.finalValue}</td></tr>
            </table>
        `;
        document.getElementById("result").innerHTML = result;
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao calcular o imposto.");
    });
}

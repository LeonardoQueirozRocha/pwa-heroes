var quant_heroes = 10;
var contar = 1;

var pubkey = "8517690a5f1c052359055840a7f4fadc";
var pvtkey = "dab64759371b74aa35317e259a73e562a6406622";
var ts = new Date().getTime();
var message = ts + pvtkey + pubkey;
var hash = CryptoJS.MD5(message);

var endpoint_marvel = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apiKey=${pubkey}&hash=${hash}`

var tela_detalhe = document.getElementById("conteudo");
var resultados = document.getElementById("resultados");
var data_json;
var CACHE_DINAMICO = "hores_dinamico";

function carregar_hero() {
    let ajax = new XMLHttpRequest();

    ajax.open("open", endpoint_marvel, true);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data_json = JSON.parse(this.responseText);

            console.log(data_json);

            // if (data_json.length > 0) {
            //     resultados.className = "row";
            // }
        }
    }
}

carregar_hero();


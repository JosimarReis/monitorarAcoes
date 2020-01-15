var request = require("request");
var cheerio = require("cheerio");
var Empresa = require("./../controllers/empresaController.js");
var Papel = require("./../controllers/papelController");
module.exports.colherEmpresas = (req, res, next) => {
  let url = "https://www.infomoney.com.br/cotacoes/empresas-b3/";

  function removeDuplicateUsingSet(arr) {
    let unique_array = Array.from(new Set(arr));
    return unique_array;
  }

  request(url, (error, response, html) => {
    var $ = cheerio.load(html);
    let empresas = [];
    $("tr").each((i, elem) => {
      let td = $(elem).find("td");
      let empresa = td.text().split("\n");

      empresa = empresa.map(i => i.trim());
      empresa = empresa.filter(i => i != "");
      if (empresa.length > 0) {
        let retorno = {
          empresa: empresa[0],
          acoes: empresa.splice(1, empresa.length - 1)
        };

        empresas = empresas.concat(retorno.acoes);
      }
    });
    empresas = removeDuplicateUsingSet(empresas);
    // return empresas;
    for (i = 0; i < empresas.length; i++) {
      let papel = {
        nome: empresas[i],
        radical: empresas[i].slice(0, 4),
        detalhes: {}
      };
      Papel.cadastrar(papel);
    }
    res.json(empresas);
  });
};

module.exports.colherFundamentus = (req, res, next) => {
  let url = "https://www.fundamentus.com.br/resultado.php";
  function removeDuplicateUsingSet(arr) {
    let unique_array = Array.from(new Set(arr));
    return unique_array;
  }
  request(url, (error, response, html) => {
    let data = new Date();
    var $ = cheerio.load(html);
    let empresas = [];
    $("table#resultado tbody tr").each((i, elem) => {
      let dados = [];
      let td = $(elem)
        .find("td")
        .each((ii, e) => {
          dados.push($(e).text());
        });
      let papel = {
        nome: dados[0],
        radical: dados[0].slice(0, 4),
        detalhes: [
          {
            cotacao: dados[1],
            PL: dados[2],
            PVP: dados[3],
            PSR: dados[4],
            divYield: dados[5],
            PAtivo: dados[6],
            PCapGiro: dados[7],
            PEbit: dados[8],
            PAtivCircLiq: dados[9],
            EVBIT: dados[10],
            EVBITDA: dados[11],
            MrgEbit: dados[12],
            MrgLiq: dados[13],
            LiqCorr: dados[14],
            ROIC: dados[15],
            ROE: dados[16],
            Liq2Meses: dados[17],
            PatrimLiq: dados[18],
            divBrutPatrim: dados[19],
            CrescRec5a: dados[20]
          }
        ]
      };
      empresas.push(papel);
    });
    empresas = removeDuplicateUsingSet(empresas);

    for (i = 0; i < empresas.length; i++) {
      Papel.alterar(empresas[i]);
    }
    res.json(empresas);
  });
};

module.exports.colherFundamentei = (req, res, next) => {
  let url = "http://localhost:5000";

  request(url, (error, response, html) => {
    let data = new Date();
    var $ = cheerio.load(html);
    let empresas = [];
    $("div.css-1x5bobx a.css-1kaq1tm").each((i, elem) => {
      let dados = [];
      let td = $(elem)
        .find("span")
        .each((ii, e) => {
          dados.push($(e).text());
        });
      let p = $(elem)
        .find("p")
        .each((ii, e) => {
          dados.push($(e).text());
        });
      let logo = $(elem)
        .find("img")
        .attr("src");

      let papel = {
        nome: dados[0],
        setor: dados[1],
        radical: dados[2],
        resumo: dados[3],
        logo: logo
      };
      empresas.push(papel);
    });
    for (i = 0; i < empresas.length; i++) {
      //  Empresa.cadastrar(empresas[i]);
    }
    res.json(empresas);
  });
};

module.exports.unirTodos = (req, res, next) => {
  let empresasFUndamentei = [];
  let urlFundamentei = "http://localhost:5000";

  request(urlFundamentei, (error, response, html) => {
    let data = new Date();
    var $ = cheerio.load(html);
    let empresas = [];
    $("div.css-1x5bobx a.css-1kaq1tm").each((i, elem) => {
      let dados = [];
      let td = $(elem)
        .find("span")
        .each((ii, e) => {
          dados.push($(e).text());
        });
      let p = $(elem)
        .find("p")
        .each((ii, e) => {
          dados.push($(e).text());
        });
      let logo = $(elem)
        .find("img")
        .attr("src");

      let papel = {
        nome: dados[0],
        setor: dados[1],
        radical: dados[2],
        resumo: dados[3],
        logo: logo
      };
      empresasFUndamentei.push(papel);
    });
  });
  let empresasFundamentus = [];
  let urlFundamentus = "https://www.fundamentus.com.br/resultado.php";

  request(urlFundamentus, (error, response, html) => {
    let data = new Date();
    var $ = cheerio.load(html);
    let empresas = [];
    $("table#resultado tbody tr").each((i, elem) => {
      let dados = [];
      let td = $(elem)
        .find("td")
        .each((ii, e) => {
          dados.push($(e).text());
        });
      let papel = {
        papel: dados[0],
        cotacao: dados[1],
        PL: dados[2],
        PVP: dados[3],
        PSR: dados[4],
        divYield: dados[5],
        PAtivo: dados[6],
        PCapGiro: dados[7],
        PEbit: dados[8],
        PAtivCircLiq: dados[9],
        EVBIT: dados[10],
        EVBITDA: dados[11],
        MrgEbit: dados[12],
        MrgLiq: dados[13],
        LiqCorr: dados[14],
        ROIC: dados[15],
        ROE: dados[16],
        Liq2Meses: dados[17],
        PatrimLiq: dados[18],
        divBrutPatrim: dados[19],
        CrescRec5a: dados[20],
        dataConsulta: data
      };
      empresasFundamentus.push(papel);
    });
  });
  let empresasInfomoney = [];
  let urlInfomoney = "https://www.infomoney.com.br/cotacoes/empresas-b3/";

  request(urlInfomoney, (error, response, html) => {
    var $ = cheerio.load(html);
    let empresas = [];
    $("tr").each((i, elem) => {
      let td = $(elem).find("td");
      let empresa = td.text().split("\n");

      empresa = empresa.map(i => i.trim());
      empresa = empresa.filter(i => i != "");
      if (empresa.length > 0) {
        let retorno = {
          empresa: empresa[0],
          acoes: empresa.splice(1, empresa.length - 1)
        };

        empresasInfomoney.push(retorno);
      }
    });
    empresas.sort(function(a, b) {
      if (a.empresa > b.empresa) {
        return 1;
      }
      if (a.empresa < b.empresa) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    // return empresas;
  });

  setTimeout(() => {
    let unidos = {
      infomoney: empresasInfomoney.length,
      fundamentus: empresasFundamentus.length,
      fundamentei: empresasFUndamentei.length
    };

    let papeisPETR = empresasInfomoney.filter(e => {
      let papeis = [];
      e.acoes.forEach(el => {
        if (el.slice(0, 4) == "PETR") papeis.push(el);
      });
      return papeis;
    });
    console.log(papeisPETR);
    res.json({
      unidos,
      infomoney: empresasInfomoney,
      fundamentus: empresasFundamentus,
      fundamentei: empresasFUndamentei
    });
  }, 3.5 * 1000);
};

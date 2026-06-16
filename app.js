'use strict';

var APP_VERSION = '3.8';

/* CLIENTES_BD generado desde: BASE_DATOS_KFC_9.xlsx + OTRAS_EMPRESAS.xlsx + MATRIZ_SUSHICORP.xlsx */
var CLIENTES_BD = [
  {nombre:"I003 - MALL DEL SOL",marca:"IL CAPPO",mes:"ENERO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J001 - MALL DEL SOL",marca:"CAJUN",mes:"ENERO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}],esKfc:true,fuente:"kfc"},
  {nombre:"K002 - 9 DE OCTUBRE",marca:"KFC",mes:"ENERO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K025 - MOBIL DURAN",marca:"KFC",mes:"ENERO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K029 - MALECON 2000",marca:"KFC",mes:"ENERO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K034 - VIA DAULE",marca:"KFC",mes:"ENERO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"K037 - DOMINGO COMIN",marca:"KFC",mes:"ENERO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K055 - MOBIL CORDOVA",marca:"KFC",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K063 - RIO CENTRO SUR",marca:"KFC",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K074 - CALIFORNIA",marca:"KFC",mes:"ENERO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"K076 - PARQUE CENTENARIO",marca:"KFC",mes:"ENERO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K077 - RIO CENTRO LOS CEIBOS",marca:"KFC",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K085 - MOBIL CEIBOS",marca:"KFC",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K087 - TERMINAL TERRESTRE GYQ",marca:"KFC",mes:"ENERO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K095 - PASEO SHOP KM 9 VIA DAULE",marca:"KFC",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K105 - HIPER MARKET",marca:"KFC",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K153 - LIGA CANTONAL DURAN",marca:"KFC",mes:"ENERO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"K154 - PASCUALES",marca:"KFC",mes:"ENERO",extintores:9,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M031 - RIO CENTRO NORTE",marca:"MENESTRAS DEL NEGRO",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"M035 - GARZOTA",marca:"MENESTRAS DEL NEGRO",mes:"ENERO",extintores:9,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"M058 - LAS PENAS",marca:"MENESTRAS DEL NEGRO",mes:"ENERO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"T032 - TERMINAL",marca:"TROPIBURGER",mes:"ENERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"V055 - MALL DEL SOL ZONA GASTRO",marca:"JUAN VALDEZ",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"A037 - RIOCENTRO EL DORADO",marca:"AMERICAN DELI",mes:"FEBRERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"BS04 - MALL DEL SOL",marca:"BASKIN ROBBINS / CINNABON",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"BS09 - RIO CENTRO SUR",marca:"BASKIN ROBBINS",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"CN31 - RIOCENTRO CEIBOS",marca:"BASKIN ROBBINS / CINNABON",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"BS38 - CEIBOS BASKIN",marca:"BASKIN ROBBINS",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E006 - MALL EL SOL",marca:"ESPAÑOL",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E010 - SAN MARINO PB",marca:"ESPAÑOL",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E026 - PUNTILLA",marca:"ESPAÑOL",mes:"FEBRERO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"I002 - RIOCENTRO CEIBOS",marca:"IL CAPPO",mes:"FEBRERO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J002 - SAN MARINO",marca:"CAJUN",mes:"FEBRERO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K007 - ALBORADA",marca:"KFC",mes:"FEBRERO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K045 - BOYACA",marca:"KFC",mes:"FEBRERO",extintores:11,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K065 - MILAGRO",marca:"KFC",mes:"FEBRERO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K090 - MACHALA CENTRO",marca:"KFC",mes:"FEBRERO",extintores:9,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K091 - MACHALA RIO CENTRO",marca:"KFC",mes:"FEBRERO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K148 - TERMINAL TERRESTRE MACHALA",marca:"KFC",mes:"FEBRERO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"V015 - CEIBOS",marca:"JUAN VALDEZ",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V021 - MALL DEL SOL",marca:"JUAN VALDEZ",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V075 - PASEO SHOPPING MACHALA",marca:"JUAN VALDEZ",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"V079 - MILAGRO",marca:"JUAN VALDEZ",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"BS37 - DORADO",marca:"BASKIN ROBBINS / CINNABON",mes:"MARZO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"G049 - OUTLET DURAN",marca:"GUS",mes:"MARZO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"I005 - SAN MARINO",marca:"IL CAPPO",mes:"MARZO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K075 - MOBIL KENNEDY",marca:"KFC",mes:"MARZO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K094 - OUTLET DURAN",marca:"KFC",mes:"MARZO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K145 - SUPER AKI SAN EDUARDO",marca:"KFC",mes:"MARZO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K169 - PLAZA PACIFICO DAULE",marca:"KFC",mes:"MARZO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K176 - SUPERCINES",marca:"KFC",mes:"MARZO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M011 - MALL SUR",marca:"MENESTRAS DEL NEGRO",mes:"MARZO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M037 - 9 DE OCTUBRE",marca:"MENESTRAS DEL NEGRO",mes:"MARZO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M046 - SAN MARINO",marca:"MENESTRAS DEL NEGRO",mes:"MARZO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M047 - PASEO SHOPPING DURAN",marca:"MENESTRAS DEL NEGRO",mes:"MARZO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M057 - ALBORADA",marca:"MENESTRAS DEL NEGRO",mes:"MARZO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"V066 - PLAZA PACIFICO DAULE",marca:"JUAN VALDEZ",mes:"MARZO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"G045 - TUNGURAHUA",marca:"GUS",mes:"ABRIL",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"I012 - TERMINAL TERRESTRE",marca:"IL CAPPO",mes:"ABRIL",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K069 - LOJA",marca:"KFC",mes:"ABRIL",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K082 - SHOPPING PLAYAS",marca:"KFC",mes:"ABRIL",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K161 - MALL DEL RIO GYE",marca:"KFC",mes:"ABRIL",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"V057 - CORAL SAMBORONDON",marca:"JUAN VALDEZ",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V087 - PASEO SHOPPING DAULE",marca:"JUAN VALDEZ",mes:"ABRIL",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"A006 - TERMINAL GYE",marca:"AMERICAN DELI",mes:"MAYO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"A024 - MALL DEL SUR",marca:"AMERICAN DELI",mes:"MAYO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"BS16 - PUNTILLA",marca:"BASKIN ROBBINS / CINNABON",mes:"MAYO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"BS20 - RIO CENTRO NORTE",marca:"BASKIN ROBBINS",mes:"MAYO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E023 - PREEMB NAC GYE",marca:"ESPAÑOL",mes:"MAYO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"G050 - MALL DEL SUR",marca:"GUS",mes:"MAYO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}],esKfc:true,fuente:"kfc"},
  {nombre:"K003 - PLAZA QUIL",marca:"KFC",mes:"MAYO",extintores:8,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K059 - MALL DEL SUR P/B",marca:"KFC",mes:"MAYO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K096 - PORTETE",marca:"KFC",mes:"MAYO",extintores:12,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M056 - AEROPUERTO GYE",marca:"MENESTRAS DEL NEGRO",mes:"MAYO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"R003 - 9 DE OCTUBRE",marca:"CASA RES",mes:"MAYO",extintores:8,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"R004 - SAN MARINO",marca:"CASA RES",mes:"MAYO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"R008 - MALL DEL SOL",marca:"CASA RES",mes:"MAYO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"R010 - FRANCISCO DE ORELLANA",marca:"CASA RES",mes:"MAYO",extintores:20,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"V004 - AEROPUERTO",marca:"JUAN VALDEZ",mes:"MAYO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"V024 - PREEMBARQUE NACIONAL",marca:"JUAN VALDEZ",mes:"MAYO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V048 - MALL DEL RIO GYE",marca:"JUAN VALDEZ",mes:"MAYO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"CN34 - RIO CENTRO SUR CINNABON TO GO",marca:"CINNABON",mes:"JUNIO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"CN35 - RIO CENTRO NORTE",marca:"CINNABON",mes:"JUNIO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"F003 - DOLCE INCONTRO AERGYE",marca:"AMERICAN DELI",mes:"JUNIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"G048 - TERMINAL TERRESTRE",marca:"GUS",mes:"JUNIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"G052 - CITY MALL",marca:"GUS",mes:"JUNIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"I004 - MALL DEL SUR",marca:"IL CAPPO",mes:"JUNIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J008 - TERMINAL",marca:"CAJUN",mes:"JUNIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K079 - BABAHOYO",marca:"KFC",mes:"JUNIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K083 - MUCHO LOTE",marca:"KFC",mes:"JUNIO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K115 - ENTRADA DE LA 8",marca:"KFC",mes:"JUNIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"K186 - PINTULAC MILAGRO",marca:"KFC",mes:"JUNIO",extintores:9,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M014 - RIOCENTRO SUR",marca:"MENESTRAS DEL NEGRO",mes:"JUNIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M028 - VILLAGE",marca:"MENESTRAS DEL NEGRO",mes:"JUNIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"T043 - MALL EL FORTIN",marca:"TROPIBURGER",mes:"JUNIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V089 - PINTULAC MILAGRO",marca:"JUAN VALDEZ",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"A007 - SAN MARINO",marca:"AMERICAN DELI",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"A020 - VILLAGE PLAZA",marca:"AMERICAN DELI",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"DI01 - DOLCE INCONTRO MALL DEL SOL",marca:"DOLCE INCONTRO",mes:"JULIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"DI02 - DOLCE INCONTRO CEIBOS",marca:"DOLCE INCONTRO",mes:"JULIO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"DI03 - DOLCE INCONTRO SAMBORONDON",marca:"DOLCE INCONTRO",mes:"JULIO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"G047 - ALBORADA",marca:"GUS",mes:"JULIO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"G051 - SHOPPING QUEVEDO",marca:"GUS",mes:"JULIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J006 - CAJUN PUNTILLA",marca:"CAJUN",mes:"JULIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J020 - CAJUN PENINSULA",marca:"CAJUN",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"J021 - MALL DEL SUR",marca:"CAJUN",mes:"JULIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J029 - CAJUN MALL DEL NORTE",marca:"CAJUN",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K058 - MALL DEL SUR PLANTA ALTA",marca:"KFC",mes:"JULIO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K078 - SHOPPING DAULE",marca:"KFC",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K092 - EL FORTIN",marca:"KFC",mes:"JULIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K093 - QUEVEDO",marca:"KFC",mes:"JULIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K106 - SHOPPING QUEVEDO",marca:"KFC",mes:"JULIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K149 - PETROCOMERIAL VENTANAS",marca:"KFC",mes:"JULIO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K162 - DAULE ESTACION",marca:"KFC",mes:"JULIO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K165 - PLAZA TIA DURAN",marca:"KFC",mes:"JULIO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K171 - SHELL ABU DABI",marca:"KFC",mes:"JULIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K172 - MALL DEL NORTE",marca:"KFC",mes:"JULIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"M032 - SHOPPING QUEVEDO",marca:"MENESTRAS DEL NEGRO",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"M062 - MN MALL DEL NORTE GY",marca:"MENESTRAS DEL NEGRO",mes:"JULIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"V003 - SAN MARINO",marca:"JUAN VALDEZ",mes:"JULIO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V005 - URDESA",marca:"JUAN VALDEZ",mes:"JULIO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V016 - POLICENTRO",marca:"JUAN VALDEZ",mes:"JULIO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V069 - QUEVEDO PASEO SHOPPING",marca:"JUAN VALDEZ",mes:"JULIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"A019 - MALL DEL SOL PATIO COMIDAS",marca:"AMERICAN DELI",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"CA01 - CAFE ASTORIA SALIDA INTERNACIONAL",marca:"CAFA",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"CA02 - CAFE ASTORIA PREEMBARQUE INTERNACIONAL",marca:"CAFA",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"CA03 - CAFE DUPORT HALL PRINCIPAL",marca:"CAFA",mes:"AGOSTO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"CN26 - PREEMB INTER GYE",marca:"CINNABON",mes:"AGOSTO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"DI04 - DOLCE INCONTRO URDESA",marca:"DOLCE INCONTRO",mes:"AGOSTO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}],esKfc:true,fuente:"kfc"},
  {nombre:"E007 - URDESA",marca:"ESPAÑOL",mes:"AGOSTO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"E022 - ISLA EXP GYE",marca:"ESPAÑOL",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"G044 - BOYACA",marca:"GUS",mes:"AGOSTO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J005 - CAJUN CEIBOS",marca:"CAJUN",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K012 - RIO CENTRO",marca:"KFC",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"K021 - MALL EL SOL",marca:"KFC",mes:"AGOSTO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K052 - LAS PEÑAS",marca:"KFC",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K053 - PASEO SHOPPING BABAHOYO",marca:"KFC",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"K187 - DOMINGO COMIN Y ERNESTO ALBAN",marca:"KFC",mes:"AGOSTO",extintores:10,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M010 - MALECON",marca:"MENESTRAS DEL NEGRO",mes:"AGOSTO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M021 - TERMINAL TER GYQ.",marca:"MENESTRAS DEL NEGRO",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"M039 - PASEO SHOPPING BABAHOYO",marca:"MENESTRAS DEL NEGRO",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "MOVILIZACIÓN", "marca": "", "cap": 0}],esKfc:true,fuente:"kfc"},
  {nombre:"M043 - EL FORTIN",marca:"MENESTRAS DEL NEGRO",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V090 - SUPER AKI LA JOYA GYE",marca:"JUAN VALDEZ",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"A033 - CITY MALL",marca:"AMERICAN DELI",mes:"SEPTIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"BS22 - POLICENTRO",marca:"BASKIN ROBBINS",mes:"SEPTIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E031 - POLICENTRO",marca:"ESPAÑOL",mes:"SEPTIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K129 - LLEVAR 5 ESQUINAS",marca:"KFC",mes:"SEPTIEMBRE",extintores:7,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"V080 - AGORA GYE",marca:"JUAN VALDEZ",mes:"SEPTIEMBRE",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"B001 - STATION SPORTS BAR",marca:"AMERICAN DELI",mes:"OCTUBRE",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"E009 - CEIBOS",marca:"ESPAÑOL",mes:"OCTUBRE",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E030 - CITY MALL",marca:"ESPAÑOL",mes:"OCTUBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"J011 - CITY MALL",marca:"CAJUN",mes:"OCTUBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K088 - HIPERMARKET VIA DAULE",marca:"KFC",mes:"OCTUBRE",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K109 - CITY MALL PA",marca:"KFC",mes:"OCTUBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K110 - CITY MALL PB",marca:"KFC",mes:"OCTUBRE",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 75}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K117 - 29 Y SEDALANA",marca:"KFC",mes:"OCTUBRE",extintores:14,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"M033 - CITY MALL",marca:"MENESTRAS DEL NEGRO",mes:"OCTUBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M061 - PORTETE",marca:"MENESTRAS DEL NEGRO",mes:"OCTUBRE",extintores:10,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:true,fuente:"kfc"},
  {nombre:"A047 - RIO CENTRO NORTE GYE",marca:"AMERICAN DELI",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"E044 - EL DORADO",marca:"ESPAÑOL",mes:"NOVIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"G054 - RIOCENTRO EL DORADO",marca:"GUS",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"I017 - RIO CENTRO NORTE GYE",marca:"IL CAPPO",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"I018 - DORADO GYE",marca:"IL CAPPO",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J030 - RIO CENTRO SUR GYE",marca:"CAJUN",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"J031 - GRAN PIAZZA MACHA",marca:"CAJUN",mes:"NOVIEMBRE",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K048 - PENINSULA SALINAS",marca:"KFC",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K051 - SAN MARINO PLANTA ALTA",marca:"KFC",mes:"NOVIEMBRE",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K067 - MOBIL BENEFICENCIA",marca:"KFC",mes:"NOVIEMBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K123 - RIOCENTRO EL DORADO",marca:"KFC",mes:"NOVIEMBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K173 - OASIS",marca:"KFC",mes:"NOVIEMBRE",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K178 - MALECON SALINAS",marca:"KFC",mes:"NOVIEMBRE",extintores:10,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K179 - ESTACION SANTA ELENA",marca:"KFC",mes:"NOVIEMBRE",extintores:9,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K180 - GRAN PIAZZA MACHALA",marca:"KFC",mes:"NOVIEMBRE",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K184 - SUPERMAXI MACHALA",marca:"KFC",mes:"NOVIEMBRE",extintores:9,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"M050 - RIOCENTRO EL DORADO",marca:"MENESTRAS DEL NEGRO",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"M065 - GRAN PIAZZA MACH",marca:"MENESTRAS DEL NEGRO",mes:"NOVIEMBRE",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"T054 - GRAN PIAZZA MACHALA",marca:"TROPIBURGER",mes:"NOVIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"V053 - PUERTO SANTA ANA",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V073 - CORAL LOS CEIBOS",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V076 - TERMINAL TERRESTE GYE",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V077 - FERRISARIATO KENNEDY",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V078 - RIOCENTRO SUR GYE",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V082 - GRAN PIAZZA MACHA",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V085 - PASEO SHOPPING PENINSULA",marca:"JUAN VALDEZ",mes:"NOVIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J010 - RIO CENTRO NORTE",marca:"CAJUN",mes:"DICIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"J019 - RIOCENTRO EL DORADO",marca:"CAJUN",mes:"DICIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K039 - AEROPUERTO GY",marca:"KFC",mes:"DICIEMBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "TIPO K", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:true,fuente:"kfc"},
  {nombre:"K142 - SUPER AKI VINCES",marca:"KFC",mes:"DICIEMBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"K175 - VIA A LA COSTA",marca:"KFC",mes:"DICIEMBRE",extintores:11,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K182 - JUAN TANCA MARENGO",marca:"KFC",mes:"DICIEMBRE",extintores:13,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"K183 - LA QUADRA QUEVEDO",marca:"KFC",mes:"DICIEMBRE",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"T051 - MALECON GYE",marca:"TROPIBURGER",mes:"DICIEMBRE",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "TIPO K", "marca": "", "cap": 2}],esKfc:true,fuente:"kfc"},
  {nombre:"V084 - TORRE MILLENIUM",marca:"JUAN VALDEZ",mes:"DICIEMBRE",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"V086 - PASEO SHOPPING PLAYAS",marca:"JUAN VALDEZ",mes:"DICIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:true,fuente:"kfc"},
  {nombre:"MUNDICABLES",marca:"",mes:"ENERO",extintores:15,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 3}],esKfc:false,fuente:"otras"},
  {nombre:"INDUTORRES",marca:"",mes:"ENERO",extintores:33,tipos:[{"tipo": "FOAM", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA ESTEROS",marca:"",mes:"ENERO",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSUCORP DURAN",marca:"",mes:"ENERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO DURAN",marca:"",mes:"ENERO",extintores:8,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PJ BUENA VISTA",marca:"",mes:"ENERO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORO ASADO PLANTA",marca:"",mes:"ENERO",extintores:16,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"INMOBILIARIA KHOURY",marca:"",mes:"ENERO",extintores:19,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "2C", "marca": "", "cap": 0}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"BONTEX",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"KURMA",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"SECOMATICO",marca:"",mes:"ENERO",extintores:13,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA CRISTO",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"COLEGIO SAN LUIS REY DE FRANCIA",marca:"",mes:"ENERO",extintores:19,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 3}],esKfc:false,fuente:"otras"},
  {nombre:"FUJIFILM",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"ING CHANE",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO CORAL CEIBOS",marca:"",mes:"ENERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA CENTENARIO",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA ENTRE RIOS",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA SAMANES",marca:"",mes:"ENERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"ALMODOBAR GUAYARTE",marca:"",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PEÑA LUIS ILUCTRONS",marca:"",mes:"FEBRERO",extintores:8,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CLINICA ODONTOLOGICA SURIAN",marca:"",mes:"FEBRERO",extintores:7,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PJ GARZOTA",marca:"",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"SECOMATICO",marca:"",mes:"FEBRERO",extintores:13,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"ROLORTIZ",marca:"",mes:"FEBRERO",extintores:13,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}],esKfc:false,fuente:"otras"},
  {nombre:"IVAN RIVADENEIRA CEBICHES EL DORADO",marca:"",mes:"FEBRERO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PAPIZZEC MILAGRO",marca:"",mes:"FEBRERO",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"FEDERAL",marca:"",mes:"FEBRERO",extintores:12,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"JEANS - RUMICHACA Y 9OCT (ALADO GARAJE) ANDREA SARABIA",marca:"",mes:"FEBRERO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"FIGURA Y SALUD",marca:"",mes:"FEBRERO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"GASEC",marca:"",mes:"FEBRERO",extintores:16,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 26}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"SOCELEC",marca:"",mes:"FEBRERO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA PLAZA TIA CENTRAL",marca:"",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"EMPANADAS PACO CITY MALL",marca:"",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"EMPANADAS PACO VERMONT PLAZA",marca:"",mes:"FEBRERO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PHARMEDICAL PARQUE COLON",marca:"",mes:"FEBRERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"YOPIURA ENTRE RIOS",marca:"",mes:"FEBRERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:false,fuente:"otras"},
  {nombre:"PACO RIOC CEIBOS",marca:"",mes:"FEBRERO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORO RIOC EL DORADO",marca:"",mes:"MARZO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORO ASADO DURAN",marca:"",mes:"MARZO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PAPA JOHNS VILLA CLUB",marca:"",mes:"MARZO",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PLAZA TIA EL CAMINO PACO",marca:"",mes:"MARZO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PLAZA TIA LA JOYA PACO",marca:"",mes:"MARZO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"LOS ARCOS PLAZA 2 LATITUD 0",marca:"",mes:"MARZO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"FREIRE VILLA CLUB",marca:"",mes:"MARZO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CONGAS PORTOVIEJO",marca:"",mes:"MARZO",extintores:14,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 150}],esKfc:false,fuente:"otras"},
  {nombre:"THE POINT SHIRLEY COBO",marca:"",mes:"MARZO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA PLAZA TIA LA JOYA",marca:"",mes:"MARZO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"GARAJE SUCRE Y MALECON SILVANA",marca:"",mes:"MARZO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PROBANEN",marca:"",mes:"MARZO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CENTRO ODONTOPEDIATRICO CEIBOS",marca:"",mes:"MARZO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"EDISON ROLANDO/VICTOR SHIFU XDEDIFICIO XIMA PISO 1 OFICINA 118",marca:"",mes:"MARZO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSUCORP CITY MALL",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSUCORP MALL DEL SUR",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"CEBICHES BUENA VISTA SOCIEDAD DE HECHO",marca:"",mes:"ABRIL",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CEBICHES RIOCENTRO PUNTILLA",marca:"",mes:"ABRIL",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CEBICHES CITY MALL",marca:"",mes:"ABRIL",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CEBICHES DE LA RUMIÑAHUI URDESA",marca:"",mes:"ABRIL",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"CEBICHES SAN MARINO",marca:"",mes:"ABRIL",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO 9 DE OCT Y G AVILES",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}],esKfc:false,fuente:"otras"},
  {nombre:"PACO TERMINAL",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO PLAZA TIA SALITRE",marca:"",mes:"ABRIL",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"LITTLE ITALY MALL DEL SOL",marca:"",mes:"ABRIL",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 100}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"FREIRE ALLYSON ALBORADA",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO MALL DEL RIO",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO JUAN MONTALVO",marca:"",mes:"ABRIL",extintores:10,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO LAS AGUAS",marca:"",mes:"ABRIL",extintores:7,tipos:[{"tipo": "AP", "marca": "", "cap": 2}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"AGO SAS",marca:"",mes:"ABRIL",extintores:8,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORO PICHINCHA Y LUQUE",marca:"",mes:"ABRIL",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PAPA JOHNS SAMBO CORAL",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSU DORADO",marca:"",mes:"ABRIL",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO COMISARIATO VIA A LA C",marca:"",mes:"ABRIL",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORO ASADO CHIMBORAZO",marca:"",mes:"MAYO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA DURAN CENTRO",marca:"",mes:"MAYO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA PASCUALES",marca:"",mes:"MAYO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA PORTETE 38",marca:"",mes:"MAYO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA SUBURBIO",marca:"",mes:"MAYO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA MUCHO LOTE",marca:"",mes:"MAYO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA PORTETE 17",marca:"",mes:"MAYO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PACO RIOCENTRO SUR",marca:"",mes:"MAYO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO ORELLANA",marca:"",mes:"MAYO",extintores:6,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"KOREA MOTORS",marca:"",mes:"MAYO",extintores:12,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"SOCELEC",marca:"",mes:"MAYO",extintores:34,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"ING BUSTOS CASTILLO",marca:"",mes:"MAYO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 15}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"BABAHOYO TORO ASADO",marca:"",mes:"JUNIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"RIOCENTRO DORADO PAPIZZEC",marca:"",mes:"JUNIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"URDESA PAPIZZEC",marca:"",mes:"JUNIO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"ALBORADA PAPIZZEC",marca:"",mes:"JUNIO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"MALL DEL SUR PAPIZZEC",marca:"",mes:"JUNIO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORO ASADO DORADO",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"SERVIORDER EDIF ONIX",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA SAUCES",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA SAN FELIPE",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA GUASMO",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA ENTRADA DE LA 8",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA CHIMBORAZO Y VELEZ",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA MILAGRO",marca:"",mes:"JUNIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO TIA BASTION",marca:"",mes:"JUNIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PACO MALL EL FORTIN ISLA",marca:"",mes:"JUNIO",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOPAN JUAN MONTALVO",marca:"",mes:"JUNIO",extintores:16,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOPAN LAS AGUAS",marca:"",mes:"JUNIO",extintores:5,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"JORGE TIERRA EKOMODA 1",marca:"",mes:"JUNIO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"JORGE TIERRA EKOMODA 2",marca:"",mes:"JUNIO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"ZUNTI SKY SPA",marca:"",mes:"JUNIO",extintores:21,tipos:[{"tipo": "CO2", "marca": "", "cap": 100}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"COMEDOR DYLAN LA 39 Y CALLEJON PARRA",marca:"",mes:"JUNIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO PLANTA DURAN",marca:"",mes:"JUNIO",extintores:12,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA MUCHO LOTE 1",marca:"",mes:"JULIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA DURAN",marca:"",mes:"JULIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSUCORP DURAN",marca:"",mes:"JULIO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO PLAZA TIA DURAN",marca:"",mes:"JULIO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PACO 9 OCT Y G AVILES",marca:"",mes:"JULIO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO MALL DEL SUR",marca:"",mes:"JULIO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PACO VILLAGE",marca:"",mes:"JULIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"LUBRICADORA GARMA",marca:"",mes:"JULIO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TRANSPORTE DE CARGA PESADA EVOLUCAR S.A. (CONGAS)",marca:"",mes:"JULIO",extintores:22,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"JV90 SUPER AKI LA JOYA",marca:"",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"RIOC CEIBOS PAPIZZEC",marca:"",mes:"AGOSTO",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"ICELAND & MARKET S.A.",marca:"",mes:"AGOSTO",extintores:19,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PRODUCSOL",marca:"",mes:"AGOSTO",extintores:19,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "H2O", "marca": "", "cap": 0}, {"tipo": "CO2", "marca": "", "cap": 0}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PROCORPORATION",marca:"",mes:"AGOSTO",extintores:5,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO SHOPPING VIA A DAULE",marca:"",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PACO MALL DEL NORTE",marca:"",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSU MALL DEL NORTE",marca:"",mes:"AGOSTO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"COBRAFACIL FABRACILISA",marca:"",mes:"AGOSTO",extintores:18,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "FOAM", "marca": "", "cap": 0}],esKfc:false,fuente:"otras"},
  {nombre:"SOCELEC",marca:"",mes:"AGOSTO",extintores:27,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}],esKfc:false,fuente:"otras"},
  {nombre:"MARCELO FREIRE SA",marca:"",mes:"AGOSTO",extintores:14,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"MARCELO FREIRE PEÑAFIEL",marca:"",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"FREIRE PEÑAFIEL MARJORIE",marca:"",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"WARENJOUS",marca:"",mes:"AGOSTO",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CHANE",marca:"",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 3}],esKfc:false,fuente:"otras"},
  {nombre:"ESCUELA MATILDE HIDALGO DEL PROCEL",marca:"",mes:"AGOSTO",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"MARYAH SPA CC LAS VITRINAS",marca:"",mes:"AGOSTO",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"METROBURGER ASHLEY AREVALO",marca:"",mes:"SEPTIEMBRE",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"SANDR MADINYA SCHOENSTATT",marca:"",mes:"SEPTIEMBRE",extintores:12,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 3}],esKfc:false,fuente:"otras"},
  {nombre:"DIEGO PIMIENTEL RUDY’S - ROMERIA PLAZA",marca:"",mes:"SEPTIEMBRE",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"LAPSAN ALICIA GARCIA",marca:"",mes:"SEPTIEMBRE",extintores:17,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"FIDEO NAPOLITANO",marca:"",mes:"SEPTIEMBRE",extintores:9,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO ORELLANA",marca:"",mes:"SEPTIEMBRE",extintores:7,tipos:[{"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO LAS AGUAS",marca:"",mes:"SEPTIEMBRE",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO DURAN",marca:"",mes:"SEPTIEMBRE",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TECNICENTRO ATM",marca:"",mes:"SEPTIEMBRE",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO UNIV ESTATAL",marca:"",mes:"SEPTIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"TORRES DEL SOL",marca:"",mes:"SEPTIEMBRE",extintores:30,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"EMPANADAS PACO MALECON",marca:"",mes:"OCTUBRE",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"SHIATSU MALL DEL SOL",marca:"",mes:"OCTUBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"JOYERIA MARTITHA MALL DEL SOL",marca:"",mes:"OCTUBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"JOYERIA MARTITHA CENTRO",marca:"",mes:"OCTUBRE",extintores:4,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"EMPANADAS PACO MALL DEL SOL",marca:"",mes:"OCTUBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO MUCHO LOTE COMISARIATO",marca:"",mes:"OCTUBRE",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"CIUDAD DEL SOL PAPIZZEC",marca:"",mes:"NOVIEMBRE",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PELUQUERIA YENS",marca:"",mes:"NOVIEMBRE",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"EQUILIBRIUM",marca:"",mes:"NOVIEMBRE",extintores:23,tipos:[{"tipo": "CO2", "marca": "", "cap": 15}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"PACO TIA VIA A LA COSTA",marca:"",mes:"NOVIEMBRE",extintores:1,tipos:[{"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"PACO MALECON Y COLON",marca:"",mes:"NOVIEMBRE",extintores:1,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA VILLA CLUB",marca:"",mes:"NOVIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"EL TORO ASADO FORTIN",marca:"",mes:"DICIEMBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO SAMBORONDON",marca:"",mes:"DICIEMBRE",extintores:3,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 5}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOVOCENTRO ORELLANA",marca:"",mes:"DICIEMBRE",extintores:6,tipos:[{"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "CO2", "marca": "", "cap": 10}],esKfc:false,fuente:"otras"},
  {nombre:"TORTAMANIA URDESA",marca:"",mes:"DICIEMBRE",extintores:2,tipos:[{"tipo": "PQS", "marca": "", "cap": 10}, {"tipo": "PQS", "marca": "", "cap": 5}],esKfc:false,fuente:"otras"},
  {nombre:"NOE MALL DEL SOL",marca:"",mes:"FEBRERO",extintores:6,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"NOE BOCCA SAMBO",marca:"",mes:"FEBRERO",extintores:4,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE SUPERCINES ORELLANA",marca:"",mes:"MARZO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE PLAZA BATAN",marca:"",mes:"AGOSTO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE MALL DEL SOL",marca:"",mes:"AGOSTO",extintores:2,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE MALL DEL NORTE",marca:"",mes:"JULIO",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"NOE SAN MARINO",marca:"",mes:"NOVIEMBRE",extintores:5,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "K", "marca": "", "cap": 0}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE PLAZA TIA JOYA",marca:"",mes:"NOVIEMBRE",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE BAMBOO PLAZA VIA A LA C",marca:"",mes:"NOVIEMBRE",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE RIOC ENTRE RIOS",marca:"",mes:"NOVIEMBRE",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE RIOC CEIBOS",marca:"",mes:"DICIEMBRE",extintores:3,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE URDESA",marca:"",mes:"NOVIEMBRE",extintores:8,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
  {nombre:"KOBE PLANTA",marca:"",mes:"NOVIEMBRE",extintores:16,tipos:[{"tipo": "CO2", "marca": "", "cap": 50}, {"tipo": "CO2", "marca": "", "cap": 10}, {"tipo": "CO2", "marca": "", "cap": 5}, {"tipo": "PQS", "marca": "", "cap": 20}, {"tipo": "PQS", "marca": "", "cap": 10}],esKfc:false,fuente:"sushi"},
];

var GROQ_KEY_DEFAULT = '';

/* ===================================================
   CONSTANTS — DROPBOX
=================================================== */
var DBX_APP_KEY    = 'alxflmx4qckl5gb';
var DBX_REDIRECT   = 'https://alejosl0801.github.io/previfuego-recorrido/';
var DBX_RECORRIDOS = '/Previfuego/recorridos.json';
var DBX_CONFIG     = '/Previfuego/config.json';
var DBX_VISITAS    = '/Previfuego/visitas.json';
var DBX_VALERIA    = '/Previfuego/valeria_memoria.json';

var DBX_KFC_PATH   = localStorage.getItem('pf_path_kfc')   || '/Previfuego/' + new Date().getFullYear() + '/BASE_DATOS_KFC (8).xlsx';
var DBX_OTROS_PATH = localStorage.getItem('pf_path_otros') || '/Previfuego/PRESUPUESTOS/OTRAS_EMPRESAS.xlsx';
var DBX_SUSHI_PATH = localStorage.getItem('pf_path_sushi') || '/Previfuego/PRESUPUESTOS/MATRIZ_SUSHICORP.xlsx';

/* ===================================================
   STATE
=================================================== */
var USUARIO_ACTUAL = null;
var PUNTOS = [];
var CLIENTES_DISPONIBLES = [];
var VISITAS_MES = {};
var RUTA_PREVIEW = [];
var VALERIA_MEMORIA = {};
var VALERIA_CHAT = [];
var _seguimientoInterval = null;
var _seguimientoIntervaloSeg = 30;
var _toastQueue = [];
var _toastTimer = null;
var _toastShowing = false;
var _currentRec = null;
var _undoTimer = null;
var _undoIdx = null;
var _undoData = null;
var _guardarVisitasTimer = null;
var _segPuntosCache = [];
var _obsClasifCache = {};
var _fontSizeDelta = parseInt(localStorage.getItem('pf_font_delta') || '0') || 0;
var _darkMode = localStorage.getItem('pf_dark') === '1';
var _ultimaInstruccionVoz = '';
var _pensandoValeria = false;  // Guard against concurrent Valeria AI calls
var _sincronizarValeriaP = Promise.resolve();  // Track in-flight Valeria sync
var _chipHistorial = [];
var _clientesFiltro = '';
var _clientesQuickFilter = 'todos';

function setQuickFilter(val) {
  _clientesQuickFilter = val;
  document.querySelectorAll('.qf-btn').forEach(function(b) {
    b.classList.toggle('qf-btn-active', b.dataset.qf === val);
  });
  renderClientesMes();
}

var USUARIOS = {
  alejandro: { nombre: 'Alejandro', emoji: '👔', esAdmin: true },
  raul:      { nombre: 'Ra\xFAl',   emoji: '👷' },
  juan:      { nombre: 'Juan',      emoji: '👷' }
};

/* ===================================================
   DARK MODE + FONT SIZE — init immediately
=================================================== */
(function initAppearance() {
  if (_darkMode) document.documentElement.classList.add('dark');
  if (_fontSizeDelta !== 0) {
    document.documentElement.style.fontSize = (16 + _fontSizeDelta) + 'px';
  }
})();

function toggleDarkMode() {
  _darkMode = !_darkMode;
  localStorage.setItem('pf_dark', _darkMode ? '1' : '0');
  document.documentElement.classList.toggle('dark', _darkMode);
  showToast(_darkMode ? 'Modo oscuro activado' : 'Modo claro activado');
}

function cambiarFuente(delta) {
  _fontSizeDelta = Math.max(-4, Math.min(8, _fontSizeDelta + delta));
  localStorage.setItem('pf_font_delta', String(_fontSizeDelta));
  document.documentElement.style.fontSize = (16 + _fontSizeDelta) + 'px';
  showToast('Tama\xF1o: ' + (16 + _fontSizeDelta) + 'px');
}

/* ===================================================
   OFFLINE BANNER
=================================================== */
window.addEventListener('offline', function() {
  var b = document.getElementById('offline-banner');
  if (b) b.classList.remove('hidden');
});
window.addEventListener('online', function() {
  var b = document.getElementById('offline-banner');
  if (b) b.classList.add('hidden');
  showToast('✅ Conexi\xF3n restaurada');
  // Retry pending tech progress upload if it stalled while offline
  if (USUARIO_ACTUAL && !USUARIOS[USUARIO_ACTUAL].esAdmin && PUNTOS.length) subirFichas();
});

/* ===================================================
   OAUTH PKCE — DROPBOX
=================================================== */
function getAccessToken() {
  return localStorage.getItem('pf_dbx_access_token') || '';
}

function getRefreshToken() {
  return localStorage.getItem('pf_dbx_refresh_token') || '';
}

function isTokenExpired() {
  var exp = parseInt(localStorage.getItem('pf_dbx_token_exp') || '0') || 0;
  return Date.now() > exp - 60000;
}

function refreshAccessToken() {
  var rt = getRefreshToken();
  if (!rt) return Promise.reject(new Error('No conectado a Dropbox'));
  return fetch('https://api.dropbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=refresh_token'
      + '&refresh_token=' + encodeURIComponent(rt)
      + '&client_id=' + DBX_APP_KEY
  })
  .then(function(r) {
    if (!r.ok && r.status >= 500) throw new Error('Dropbox token endpoint error ' + r.status + ' — intenta de nuevo');
    return r.json();
  })
  .then(function(d) {
    if (d.error === 'invalid_grant' || d.error === 'expired_token') {
      localStorage.removeItem('pf_dbx_refresh_token');
      localStorage.removeItem('pf_dbx_access_token');
      pfModal('Sesi\xF3n Dropbox expirada', 'La conexi\xF3n con Dropbox expir\xF3. Ve a Config → Conectar con Dropbox para reconectar.');
      throw new Error('Sesi\xF3n Dropbox expirada — reconecta en Config');
    }
    if (d.error) throw new Error(d.error_description || d.error);
    localStorage.setItem('pf_dbx_access_token', d.access_token);
    if (d.refresh_token) localStorage.setItem('pf_dbx_refresh_token', d.refresh_token);
    if (d.expires_in) {
      localStorage.setItem('pf_dbx_token_exp', String(Date.now() + d.expires_in * 1000));
    }
    return d.access_token;
  });
}

var _refreshPromise = null;
function getValidToken() {
  if (!getRefreshToken()) return Promise.reject(new Error('No conectado a Dropbox. Ve a Config → Conectar Dropbox.'));
  if (!isTokenExpired()) return Promise.resolve(getAccessToken());
  if (_refreshPromise) return _refreshPromise;
  _refreshPromise = refreshAccessToken().finally(function() { _refreshPromise = null; });
  return _refreshPromise;
}

function generateCodeVerifier() {
  var arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode.apply(null, arr))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateCodeChallenge(verifier) {
  var data = new TextEncoder().encode(verifier);
  return crypto.subtle.digest('SHA-256', data).then(function(hash) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  });
}

function iniciarOAuth() {
  var verifier = generateCodeVerifier();
  localStorage.setItem('pf_dbx_verifier', verifier);
  generateCodeChallenge(verifier).then(function(challenge) {
    window.location.href = 'https://www.dropbox.com/oauth2/authorize'
      + '?client_id=' + DBX_APP_KEY
      + '&response_type=code'
      + '&redirect_uri=' + encodeURIComponent(DBX_REDIRECT)
      + '&code_challenge=' + challenge
      + '&code_challenge_method=S256'
      + '&token_access_type=offline';
  });
}

function handleOAuthCallback() {
  var params = new URLSearchParams(window.location.search);
  var code = params.get('code');
  if (!code) return false;
  history.replaceState({}, '', window.location.pathname);
  var verifier = localStorage.getItem('pf_dbx_verifier');
  if (!verifier) {
    pfModal('Error OAuth', 'La sesi\xF3n de autorización expir\xF3 o fue iniciada en otro dispositivo. Intenta conectar Dropbox de nuevo desde ⚙️ Config.');
    return false;
  }
  mostrarCargando(true);
  fetch('https://api.dropbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'code=' + encodeURIComponent(code)
      + '&grant_type=authorization_code'
      + '&client_id=' + DBX_APP_KEY
      + '&redirect_uri=' + encodeURIComponent(DBX_REDIRECT)
      + '&code_verifier=' + encodeURIComponent(verifier)
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    mostrarCargando(false);
    localStorage.removeItem('pf_dbx_verifier');
    if (d.error) { pfModal('Error al conectar Dropbox', d.error_description || d.error); return; }
    localStorage.setItem('pf_dbx_access_token', d.access_token);
    if (d.refresh_token) localStorage.setItem('pf_dbx_refresh_token', d.refresh_token);
    if (d.expires_in) localStorage.setItem('pf_dbx_token_exp', String(Date.now() + d.expires_in * 1000));
    showToast('✅ Dropbox conectado correctamente');
    actualizarEstadoConexion();
    _inicializarArchivosDropbox();
    // Resume session: without this the user lands stuck on the login screen after the OAuth redirect
    var savedUser = localStorage.getItem('pf_usuario');
    if (savedUser && USUARIOS[savedUser]) login(savedUser);
  })
  .catch(function(err) { mostrarCargando(false); pfModal('Error OAuth', String(err)); });
  return true;
}

function actualizarEstadoConexion() {
  var status       = document.getElementById('cfg-status');
  var btnConectar  = document.getElementById('btn-conectar-dropbox');
  var btnDesconect = document.getElementById('btn-desconectar-dropbox');

  if (getRefreshToken()) {
    if (status)       status.innerHTML = '✅ <strong>Dropbox conectado</strong>';
    if (btnConectar)  btnConectar.style.display = 'none';
    if (btnDesconect) btnDesconect.style.display = 'block';
  } else {
    if (status)       status.innerHTML = '⚠️ No conectado a Dropbox';
    if (btnConectar)  btnConectar.style.display = 'block';
    if (btnDesconect) btnDesconect.style.display = 'none';
  }

  var inKfc   = document.getElementById('cfg-path-kfc');
  var inOtros = document.getElementById('cfg-path-otros');
  var inSushi = document.getElementById('cfg-path-sushi');
  if (inKfc)   inKfc.value   = DBX_KFC_PATH;
  if (inOtros) inOtros.value = DBX_OTROS_PATH;
  if (inSushi) inSushi.value = DBX_SUSHI_PATH;

  var groqStatus = document.getElementById('cfg-groq-status');
  if (groqStatus) {
    if (getGroqKey()) {
      groqStatus.textContent = '✅ Groq AI configurado (llama-3.3-70b)';
    } else {
      groqStatus.textContent = '⚠️ Sin clave Groq — ingresa una para activar Valeria';
    }
  }

  var lastSync = document.getElementById('cfg-last-sync');
  if (lastSync) {
    var ts = localStorage.getItem('pf_last_sync');
    lastSync.textContent = ts ? '\xDAltima sync: ' + ts : '\xDAltima sync: —';
  }

  var rRaul = document.getElementById('cfg-nombre-raul');
  var rJuan = document.getElementById('cfg-nombre-juan');
  if (rRaul) rRaul.value = localStorage.getItem('pf_nombre_raul') || 'Ra\xFAl';
  if (rJuan) rJuan.value = localStorage.getItem('pf_nombre_juan') || 'Juan';
}

function desconectarDropbox() {
  localStorage.removeItem('pf_dbx_access_token');
  localStorage.removeItem('pf_dbx_refresh_token');
  localStorage.removeItem('pf_dbx_token_exp');
  actualizarEstadoConexion();
  showToast('Dropbox desconectado');
}

function verificarConexion() {
  var debug = document.getElementById('cfg-debug');
  if (!getRefreshToken()) { if (debug) debug.textContent = '⚠️ Conecta Dropbox primero.'; return; }
  if (debug) debug.textContent = 'Verificando conexi\xF3n...';
  getValidToken()
  .then(function(token) {
    return fetch('https://api.dropboxapi.com/2/users/get_current_account', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });
  })
  .then(function(r) {
    if (!r.ok) return r.json().then(function(d) { throw new Error('HTTP ' + r.status + ': ' + (d.error_summary || JSON.stringify(d))); });
    return r.json();
  })
  .then(function(d) {
    if (debug) debug.textContent = '✅ Conectado como: ' + (d.email || (d.name && d.name.display_name) || 'OK');
    showToast('✅ Conexi\xF3n OK');
  })
  .catch(function(e) {
    if (debug) debug.textContent = '❌ Error: ' + String(e);
  });
}

function limpiarCache() {
  pfConfirm('Limpiar cach\xE9', '\xBFEliminar cach\xE9 local de clientes y puntos?', function() {
    localStorage.removeItem('pf_clientes_cache');
    var hoy = fechaHoy();
    localStorage.removeItem('pf_puntos_' + hoy);
    localStorage.removeItem('pf_estado_' + hoy);
    showToast('✅ Cach\xE9 eliminada');
  });
}

function listarCarpeta(carpeta) {
  var debug = document.getElementById('cfg-debug');
  if (!getRefreshToken()) { if (debug) debug.textContent = '⚠️ Conecta Dropbox primero.'; return; }
  if (debug) debug.textContent = 'Listando ' + carpeta + '...';
  getValidToken()
  .then(function(token) {
    return fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: carpeta, recursive: false })
    });
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.error_summary) { if (debug) debug.textContent = '❌ ' + d.error_summary; return; }
    var entries = (d.entries || []).filter(function(e) { return e['.tag'] === 'file'; });
    var txt = '📂 ' + carpeta + '\n';
    if (!entries.length) txt += '  (sin archivos)\n';
    entries.forEach(function(e) { txt += '  📄 ' + e.name + '\n'; });
    if (debug) debug.textContent = txt;
  })
  .catch(function(e) { if (debug) debug.textContent = '❌ ' + String(e); });
}

function guardarPathKfc() {
  var val = document.getElementById('cfg-path-kfc');
  if (!val) return;
  DBX_KFC_PATH = val.value.trim();
  localStorage.setItem('pf_path_kfc', DBX_KFC_PATH);
  showToast('✅ Path KFC guardado');
}

function guardarPathOtros() {
  var val = document.getElementById('cfg-path-otros');
  if (!val) return;
  DBX_OTROS_PATH = val.value.trim();
  localStorage.setItem('pf_path_otros', DBX_OTROS_PATH);
  showToast('✅ Path Otras Empresas guardado');
}

function guardarPathSushi() {
  var val = document.getElementById('cfg-path-sushi');
  if (!val) return;
  DBX_SUSHI_PATH = val.value.trim();
  localStorage.setItem('pf_path_sushi', DBX_SUSHI_PATH);
  showToast('✅ Path Sushicorp guardado');
}

function guardarNombresTecnicos() {
  var rNaul = document.getElementById('cfg-nombre-raul');
  var rJuan = document.getElementById('cfg-nombre-juan');
  if (rNaul && rNaul.value.trim()) {
    localStorage.setItem('pf_nombre_raul', rNaul.value.trim());
    USUARIOS.raul.nombre = rNaul.value.trim();
  }
  if (rJuan && rJuan.value.trim()) {
    localStorage.setItem('pf_nombre_juan', rJuan.value.trim());
    USUARIOS.juan.nombre = rJuan.value.trim();
  }
  _poblarFiltroTecnicos();  // Refresh seg filter if seguimiento tab is open
  showToast('✅ Nombres guardados');
}

function testDescargarArchivo(path) {
  var debug = document.getElementById('cfg-debug');
  if (!debug) return;
  debug.textContent = 'Descargando ' + path + '...';
  dbxDownload(path)
  .then(function(buf) {
    if (!buf) { debug.textContent = '❌ Archivo no encontrado: ' + path; return; }
    debug.textContent = '✅ Archivo OK: ' + path + ' (' + buf.byteLength + ' bytes)';
  })
  .catch(function(e) { debug.textContent = '❌ Error: ' + String(e); });
}

function inspeccionarExcel(path) {
  var debug = document.getElementById('cfg-debug');
  if (!debug) return;
  debug.textContent = 'Descargando ' + path + '...';
  dbxDownload(path)
  .then(function(buf) {
    if (!buf) { debug.textContent = '❌ Archivo no encontrado: ' + path; return; }
    var wb = XLSX.read(buf, { type: 'array' });
    var txt = '📋 Hojas: ' + wb.SheetNames.join(', ') + '\n\n';
    wb.SheetNames.forEach(function(sheetName) {
      var ws = wb.Sheets[sheetName];
      var rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
      txt += '📄 Hoja: "' + sheetName + '" — ' + rows.length + ' filas\n';
      if (rows.length) {
        txt += 'Columnas: ' + Object.keys(rows[0]).join(' | ') + '\n';
        txt += 'Fila 1: ' + Object.values(rows[0]).slice(0,8).join(' | ') + '\n';
        if (rows[1]) txt += 'Fila 2: ' + Object.values(rows[1]).slice(0,8).join(' | ') + '\n';
        if (rows[2]) txt += 'Fila 3: ' + Object.values(rows[2]).slice(0,8).join(' | ') + '\n';
      }
      txt += '\n';
    });
    debug.textContent = txt;
  })
  .catch(function(e) { debug.textContent = '❌ Error: ' + String(e); });
}

/* ===================================================
   GROQ KEY — hardcoded default, optional override
=================================================== */
function getGroqKey() {
  return localStorage.getItem('pf_groq_key') || GROQ_KEY_DEFAULT;
}

function guardarGroqKey() {
  var input = document.getElementById('cfg-groq-key');
  if (!input) return;
  var key = input.value.trim();
  if (!key) {
    localStorage.removeItem('pf_groq_key');
    input.value = '';
    var gs0 = document.getElementById('cfg-groq-status');
    if (gs0) gs0.textContent = '⚠️ Sin clave Groq — ingresa una para activar Valeria';
    showToast('Clave Groq eliminada');
    return;
  }
  localStorage.setItem('pf_groq_key', key);
  input.value = '';
  var groqStatus = document.getElementById('cfg-groq-status');
  if (groqStatus) groqStatus.textContent = '✅ Groq AI configurado (clave personalizada)';
  if (getRefreshToken()) {
    dbxDownloadJSON(DBX_CONFIG)
    .then(function(cfg) { cfg.groq_key = key; return dbxUpload(DBX_CONFIG, JSON.stringify(cfg, null, 2)); })
    .then(function() { showToast('✅ Clave Groq guardada en Dropbox'); })
    .catch(function() { showToast('✅ Clave guardada localmente (sin conexión a Dropbox)'); });
  } else {
    showToast('✅ Clave Groq guardada');
  }
}

/* Create required Dropbox files on first use so 409 not_found never fires again */
function _inicializarArchivosDropbox() {
  if (!getRefreshToken()) return;
  var archivos = [
    { path: DBX_RECORRIDOS, default: '{}' },
    { path: DBX_VISITAS,    default: '{}' },
    { path: DBX_VALERIA,    default: '{"historial_rutas":[],"patrones_cliente":{},"conversaciones":[]}' },
    { path: DBX_CONFIG,     default: '{}' }
  ];
  archivos.forEach(function(a) {
    dbxDownload(a.path).then(function(buf) {
      if (buf === null) {
        // File does not exist — create it
        dbxUpload(a.path, a.default).catch(function() {});
      }
    }).catch(function() {});
  });
}

function sincronizarConfig() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_CONFIG)
  .then(function(cfg) {
    if (cfg.groq_key) {
      localStorage.setItem('pf_groq_key', cfg.groq_key);
    }
    localStorage.setItem('pf_last_sync', new Date().toLocaleString('es-EC'));
  })
  .catch(function() {});
}

/* ===================================================
   GROQ API — shared call helper
=================================================== */
function _llamarGroq(mensajes, maxTokens, temperatura) {
  var key = getGroqKey();
  // Must reject (not throw): callers chain .then/.catch and a sync throw
  // breaks publicarRutaPreview, renderTablaSeguimiento and leaves "Pensando..." stuck
  if (!key) return Promise.reject(new Error('Sin clave Groq — ingr\xE9sala en ⚙️ Config'));
  var timeoutId;
  var timeoutP = new Promise(function(_, reject) {
    timeoutId = setTimeout(function() { reject(new Error('Tiempo de espera agotado (20s). Intenta de nuevo.')); }, 20000);
  });
  return Promise.race([
    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: mensajes,
        temperature: temperatura || 0.1,
        max_tokens: maxTokens || 1024
      })
    }).then(function(r) {
      if (!r.ok) return r.text().then(function(t) { throw new Error('Groq HTTP ' + r.status + ': ' + t.slice(0, 200)); });
      return r.json();
    }),
    timeoutP
  ]).finally(function() { clearTimeout(timeoutId); });
}

/* D1 — Auto-resumen diario de la ruta publicada */
function _resumenDiarioGroq(puntos) {
  if (!puntos || !puntos.length) return;
  var lista = puntos.map(function(p) {
    return '- ' + p.nombre + (p.esKfc ? ' (KFC)' : '') + ' → ' + (p.tecnico || 'sin asignar');
  }).join('\n');
  var DIAS_SEMANA = ['domingo','lunes','martes','mi\xE9rcoles','jueves','viernes','s\xE1bado'];
  var diaSemana = DIAS_SEMANA[new Date().getDay()];
  _llamarGroq([
    { role: 'system', content: 'Eres Valeria, asistente de Previfuego. Resume la ruta del d\xEDa en UNA sola l\xEDnea breve en espa\xF1ol. Ejemplo: "Ruta del lunes: 8 clientes KFC en Guayaquil Norte, t\xE9cnico Ra\xFAl". No agregues nada m\xE1s.' },
    { role: 'user', content: 'D\xEDa: ' + diaSemana + '\nPuntos:\n' + lista }
  ], 256, 0.3)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    if (!text) return;
    if (!VALERIA_MEMORIA.resumenes_diarios) VALERIA_MEMORIA.resumenes_diarios = [];
    // Replace existing entry for today instead of accumulating duplicates
    if (VALERIA_MEMORIA.resumenes_diarios.length && VALERIA_MEMORIA.resumenes_diarios[0].fecha === fechaHoy()) {
      VALERIA_MEMORIA.resumenes_diarios[0].resumen = text;
    } else {
      VALERIA_MEMORIA.resumenes_diarios.unshift({ fecha: fechaHoy(), resumen: text });
    }
    if (VALERIA_MEMORIA.resumenes_diarios.length > 30) VALERIA_MEMORIA.resumenes_diarios = VALERIA_MEMORIA.resumenes_diarios.slice(0, 30);
    if (getRefreshToken()) {
      dbxUpload(DBX_VALERIA, JSON.stringify(VALERIA_MEMORIA, null, 2)).catch(function() {});
    }
  })
  .catch(function(e) { console.error('[PF] resumenDiario error:', e); });
}

/* D2 — Sugerencia proactiva al cargar admin (rate-limited 4h) */
function sugerenciaProactiva() {
  if (!CLIENTES_DISPONIBLES.length) return;
  if (!VALERIA_MEMORIA.historial_rutas || !VALERIA_MEMORIA.historial_rutas.length) return;
  var ultima = parseInt(localStorage.getItem('pf_ultima_sugerencia') || '0') || 0;
  if (Date.now() - ultima < 4 * 60 * 60 * 1000) return;

  var pendientes = CLIENTES_DISPONIBLES.filter(function(c) {
    return !(VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado);
  }).slice(0, 80).map(function(c) {
    return '- ' + c.nombre + (c.esKfc ? ' (KFC)' : '') + (c.direccion ? ' - ' + c.direccion : '');
  }).join('\n');
  var historialCtx = (VALERIA_MEMORIA.historial_rutas || []).slice(0, 10).map(function(h) {
    return h.fecha + ': ' + (h.clientes || []).join(', ');
  }).join('\n');

  _llamarGroq([
    { role: 'system', content: 'Eres Valeria, asistente de Previfuego. Bas\xE1ndote en el historial de rutas y los clientes pendientes, sugiere en 1-2 frases qu\xE9 clientes deber\xEDan visitarse hoy. S\xE9 concreto y breve.' },
    { role: 'user', content: '=== HISTORIAL ===\n' + (historialCtx || '(sin historial)') + '\n\n=== PENDIENTES ===\n' + (pendientes || '(ninguno)') }
  ], 512, 0.3)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    if (text) { localStorage.setItem('pf_ultima_sugerencia', String(Date.now())); _mostrarSugerenciaChip(text); }
  })
  .catch(function(e) { console.error('[PF] sugerenciaProactiva error:', e); });
}

function _mostrarSugerenciaChip(texto) {
  var cont = document.getElementById('valeria-sugerencia');
  if (!cont) return;
  cont.innerHTML = '<div class="valeria-sugerencia-chip">💡 ' + esc(texto)
    + ' <button onclick="document.getElementById(\'valeria-sugerencia\').innerHTML=\'\'" style="background:none;border:none;cursor:pointer;color:#999">✕</button></div>';
}

/* D3 — Clasificar observaciones de t\xE9cnicos */
function clasificarObservacion(texto) {
  if (!texto || texto.length <= 20) return Promise.resolve('');
  return _llamarGroq([
    { role: 'system', content: 'Clasifica la siguiente observaci\xF3n de un t\xE9cnico de extintores. Responde \xDANICAMENTE con una de estas tres etiquetas exactas: "⚠️ Problema detectado", "🔧 Requiere seguimiento", "✅ Normal".' },
    { role: 'user', content: texto }
  ], 32, 0)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    if (text.indexOf('Problema') !== -1) return '⚠️ Problema detectado';
    if (text.indexOf('seguimiento') !== -1) return '🔧 Requiere seguimiento';
    return '✅ Normal';
  })
  .catch(function() { return ''; });
}

/* D4 — Resumen IA del seguimiento del d\xEDa */
function resumenSeguimientoIA() {
  if (!_segPuntosCache || !_segPuntosCache.length) {
    pfModal('Sin datos', 'No hay recorrido publicado hoy para resumir.');
    return;
  }
  showToast('⏳ Generando resumen IA...');
  var lista = _segPuntosCache.map(function(p) {
    return '- ' + p.nombre + ' [' + (p.done ? 'LISTO' : (p.enCamino ? 'EN CAMINO' : 'PENDIENTE')) + '] '
      + (p.tecnico || 'sin asignar') + (p.observacion ? ' | Obs: ' + p.observacion : '');
  }).join('\n');
  _llamarGroq([
    { role: 'system', content: 'Eres Valeria, asistente de Previfuego. Genera un breve reporte de estado en espa\xF1ol del avance del recorrido del d\xEDa: cu\xE1ntos completados, pendientes, por t\xE9cnico, y resalta observaciones importantes. S\xE9 conciso. Firma como "Valeria 🤖".' },
    { role: 'user', content: 'Fecha: ' + fechaHoy() + '\n\n' + lista }
  ], 1024, 0.3)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    pfModal('📊 Resumen IA del d\xEDa', text || 'Sin respuesta.');
  })
  .catch(function(err) {
    pfModal('Error', 'No se pudo generar el resumen: ' + String(err));
  });
}

/* ===================================================
   VALERIA — AI ASSISTANT WITH MEMORY
=================================================== */
function sincronizarValeria() {
  if (!getRefreshToken()) return;
  _sincronizarValeriaP = dbxDownloadJSON(DBX_VALERIA)
  .then(function(mem) {
    VALERIA_MEMORIA = mem || {};
    if (!VALERIA_MEMORIA.historial_rutas) VALERIA_MEMORIA.historial_rutas = [];
    if (!VALERIA_MEMORIA.patrones_cliente) VALERIA_MEMORIA.patrones_cliente = {};
    if (!VALERIA_MEMORIA.conversaciones) VALERIA_MEMORIA.conversaciones = [];
  })
  .catch(function() {
    VALERIA_MEMORIA = { historial_rutas: [], patrones_cliente: {}, conversaciones: [] };
  });
}

function actualizarMemoriaValeria(puntos, instruccion) {
  // Wait for any in-flight sincronizarValeria download to finish — prevents overwrite race
  _sincronizarValeriaP.then(function() { _doActualizarMemoriaValeria(puntos, instruccion); });
}
function _doActualizarMemoriaValeria(puntos, instruccion) {
  if (!VALERIA_MEMORIA.historial_rutas) VALERIA_MEMORIA.historial_rutas = [];
  if (!VALERIA_MEMORIA.patrones_cliente) VALERIA_MEMORIA.patrones_cliente = {};

  var tecnicos = {};
  puntos.forEach(function(p) {
    var t = p.tecnico || 'Sin asignar';
    if (!tecnicos[t]) tecnicos[t] = [];
    tecnicos[t].push(p.nombre);
  });

  var entrada = {
    fecha: fechaHoy(),
    instruccion: instruccion || '',
    clientes: puntos.map(function(p) { return p.nombre; }),
    tecnicos: tecnicos
  };

  VALERIA_MEMORIA.historial_rutas.unshift(entrada);
  if (VALERIA_MEMORIA.historial_rutas.length > 60) {
    VALERIA_MEMORIA.historial_rutas = VALERIA_MEMORIA.historial_rutas.slice(0, 60);
  }

  puntos.forEach(function(p) {
    var key = p.nombre;
    if (!VALERIA_MEMORIA.patrones_cliente[key]) {
      VALERIA_MEMORIA.patrones_cliente[key] = { ultimo_recorrido: '', veces_en_ruta: 0, tecnico_habitual: '' };
    }
    var pc = VALERIA_MEMORIA.patrones_cliente[key];
    pc.ultimo_recorrido = fechaHoy();
    pc.veces_en_ruta = (pc.veces_en_ruta || 0) + 1;
    if (p.tecnico) pc.tecnico_habitual = p.tecnico;
  });

  // Cap patrones_cliente at 300 entries (LRU: remove oldest by ultimo_recorrido)
  var keys = Object.keys(VALERIA_MEMORIA.patrones_cliente);
  if (keys.length > 300) {
    keys.sort(function(a, b) {
      return (VALERIA_MEMORIA.patrones_cliente[a].ultimo_recorrido || '')
           < (VALERIA_MEMORIA.patrones_cliente[b].ultimo_recorrido || '') ? -1 : 1;
    });
    keys.slice(0, keys.length - 300).forEach(function(k) {
      delete VALERIA_MEMORIA.patrones_cliente[k];
    });
  }

  if (getRefreshToken()) {
    dbxUpload(DBX_VALERIA, JSON.stringify(VALERIA_MEMORIA, null, 2)).catch(function(e) {
      console.error('[PF] actualizarMemoriaValeria error:', e);
    });
  }
}

function _esConsultaValeria(texto) {
  // App-improvement requests must go to consultarValeria, NOT route creation.
  var esMejoras = /\b(mejor|mejora|suger|recomiend|implementa|funcionalidad|feature)\b/i.test(texto);
  if (esMejoras) return true;

  // Route-creation keywords take priority — even if the message contains "?"
  var crearRutaPatrones = /\b(pon|agrega|agregar|incluye|incluir|mete|meter|crea|crear|dame|haz|hacer|selecciona|seleccionar|a\xF1ade|a\xF1adir)\b/i;
  if (crearRutaPatrones.test(texto)) return false;

  var consultaPatrones = [
    /\bcu\xe1ndo\b/i, /\bqu\xe9 hicimos\b/i, /\bhistorial\b/i, /\brecordas\b/i,
    /\bfuimos a\b/i, /\ba d\xF3nde\b/i, /\bcu\xe1ntas veces\b/i, /\bqu\xe9 d\xEDa\b/i,
    /\bla \xFAltima vez\b/i, /\bme recuerdas\b/i, /\bmuestra\b/i, /\bcu\xe1l es\b/i,
    /\bcu\xe1nto\b/i, /\bcu\xe1ntos\b/i
  ];
  for (var i = 0; i < consultaPatrones.length; i++) {
    if (consultaPatrones[i].test(texto)) return true;
  }
  return false;
}

function consultarValeria(texto) {
  agregarBurbuja('valeria', '⏳ Pensando...', 'thinking');

  var hoy = new Date();
  var hace30 = new Date(hoy.getTime() - 30 * 24 * 60 * 60 * 1000);

  var historialReciente = (VALERIA_MEMORIA.historial_rutas || []).filter(function(h) {
    var partes = (h.fecha || '').split('/');
    if (partes.length !== 3) return false;
    var d = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    if (isNaN(d.getTime())) return false;
    return d >= hace30;
  }).slice(0, 15);

  // Limit to first 150 clients to keep the prompt compact
  var MAX_CLIENTES_CTX = 150;
  var clientesCtx = CLIENTES_DISPONIBLES.slice(0, MAX_CLIENTES_CTX).map(function(c, i) {
    var vis = VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado ? 'VISITADO' : 'PENDIENTE';
    var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
    var extra = patron ? ' [veces:' + (patron.veces_en_ruta || 0) + ',\xFAltima:' + (patron.ultimo_recorrido || '—') + ']' : '';
    return i + '. [' + (c.esKfc ? 'KFC' : 'OTRO') + '] ' + c.nombre
      + (c.local ? ' (' + c.local + ')' : '') + ' - ' + c.direccion + ' [' + vis + ']' + extra;
  }).join('\n');
  if (CLIENTES_DISPONIBLES.length > MAX_CLIENTES_CTX) {
    clientesCtx += '\n... y ' + (CLIENTES_DISPONIBLES.length - MAX_CLIENTES_CTX) + ' m\xE1s';
  }

  var historialCtx = historialReciente.map(function(h) {
    var tecCtx = '';
    if (h.tecnicos) {
      tecCtx = ' | T\xe9cnicos: ' + Object.keys(h.tecnicos).map(function(t) {
        return t + '(' + (h.tecnicos[t] || []).join(',') + ')';
      }).join('; ');
    }
    return h.fecha + ': "' + (h.instruccion || '') + '" → ' + (h.clientes || []).join(', ') + tecCtx;
  }).join('\n');

  var esMejoras = /mejor[ao]|implementa|funcionalidad|feature|sugiere|recomienda|cambio|app|sistema|necesitamos/i.test(texto);
  var DIAS_SEMANA = ['domingo','lunes','martes','mi\xE9rcoles','jueves','viernes','s\xE1bado'];
  var diaSemana = DIAS_SEMANA[new Date().getDay()];

  var systemMsg = 'Eres Valeria, asistente experta de PREVIFUEGO, empresa de extintores y seguridad contra incendios en Guayaquil, Ecuador.\n'
    + 'Admin: Alejandro López (dueño). Técnicos: ' + USUARIOS.raul.nombre + ' y ' + USUARIOS.juan.nombre + '.\n'
    + 'Hoy es ' + diaSemana + ' ' + fechaHoy() + '.\n'
    + 'CONOCIMIENTO OPERATIVO:\n'
    + '- Sectores Guayaquil: Norte (Alborada, Garzota, Sauces, Kennedy, V\xEDa Perimetral, V\xEDa Daule, Los Ceibos), Centro (Mal\xE9con, Urdesa, Miraflores), Riocentros (Norte, El Dorado, Ceibos, Puntilla), Malls (Mall del Sol, San Marino, City Mall, Mall del Norte, Village Plaza), Oriente (Samborond\xF3n), Sur (Guasmo, Pascuales), Dur\xE1n.\n'
    + '- Cadenas principales: KFC (m\xFAltiples locales), Cebiches de la Rumi\xF1ahui, Menestras del Negro, Tortaman\xEDa, Papa Johns, Empanadas de Paco, Caj\xFAn Grill, American Deli, Juan Valdez, Baskin Robbins, No\xE9, Dolce Incontro, Casa Res, El Toro Asado, TropiBurger.\n'
    + '- Empresas: G\xF3mez y G\xF3mez (cierra 12pm), VESEIND (recargas), Congas, Produsol, Segumar SCI, Importadora Federal, L\xF3pez y L\xF3pez, Servintex, SEPRO, Bidokan, Carsague, Tractocentro, Korea Motors, Demaco.\n'
    + '- Tipos de servicio: mantenimiento en sitio, retiro para recarga/mantenimiento, entrega de extintores procesados, instalaci\xF3n nueva, sistemas CO₂, recarga, evaluaci\xF3n t\xE9cnica, cobros/cheques.\n'
    + '- Recorrido t\xEDpico: 3-8 puntos por jornada, organizados por zona geogr\xE1fica. Jornada ma\xF1ana 8am-1pm, tarde 1:30pm-6pm.\n'
    + 'Tienes acceso al historial de rutas y datos de clientes. '
    + 'Responde en espa\xF1ol de forma concisa, \xFAtil y proactiva. '
    + 'Si te preguntan por clientes pendientes, agr\xFApalos por zona geogr\xE1fica. '
    + 'Si te piden crear una ruta, optimiza el orden por zonas, incluye el tiempo estimado (15-20min \xD7 n clientes) y responde con exactamente '
    + 'CREAR_RUTA: seguido del array JSON de \xEDndices. '
    + (esMejoras
      ? 'Si te piden sugerencias de mejoras para la app, analiza el historial de uso y los patrones de clientes, '
        + 'y genera una lista numerada de mejoras CONCRETAS y ESPEC\xCDFICAS basadas en los datos reales. '
        + 'Termina tu respuesta con este bloque exacto para que el administrador lo pueda copiar a Claude:\n'
        + '--- INSTRUCCIÓN PARA CLAUDE ---\n'
        + '[aquí escribe en imperativo las mejoras a implementar, siendo muy específico con cada feature]\n'
        + '--- FIN INSTRUCCIÓN ---\n'
      : '')
    + 'Siempre firma tus respuestas como "Valeria 🤖".';

  var userMsg = '=== HISTORIAL \xDALTIMOS 30 D\xCDAS ===\n' + (historialCtx || '(sin historial)') + '\n\n'
    + '=== CLIENTES DEL MES (con estado de visita y patrones) ===\n' + (clientesCtx || '(sin clientes)') + '\n\n'
    + '=== PREGUNTA DEL ADMINISTRADOR ===\n' + texto;

  _llamarGroq([
    { role: 'system', content: systemMsg },
    { role: 'user', content: userMsg }
  ], 4096, 0.2)
  .then(function(d) {
    eliminarBurbujaThinking();
    if (d.error) throw new Error(d.error.message || 'Error Groq API');
    var choice = (d.choices || [])[0] || {};
    if (choice.finish_reason === 'length') {
      agregarBurbuja('valeria', '⚠️ Respuesta incompleta (l\xEDmite de tokens). Intenta con una instrucci\xF3n m\xE1s corta.');
      return;
    }
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();

    if (text.trim().indexOf('CREAR_RUTA:') === 0) {
      var jsonPart = text.slice('CREAR_RUTA:'.length).trim();
      var match = jsonPart.match(/\[[\d,\s,-]*\]/);
      if (match) {
        var indices = JSON.parse(match[0]);
        RUTA_PREVIEW = indices
          .filter(function(i) { return Number.isInteger(i) && i >= 0 && i < CLIENTES_DISPONIBLES.length; })
          .map(function(i) { return Object.assign({}, CLIENTES_DISPONIBLES[i]); });
        if (RUTA_PREVIEW.length) {
          agregarBurbuja('valeria', '✅ Selecci\xF3n lista: ' + RUTA_PREVIEW.length + ' cliente(s). Revisa la vista previa abajo.');
          renderRutaPreview();
          return;
        }
      }
      agregarBurbuja('valeria', '⚠️ No encontr\xE9 clientes que coincidan con esa instrucci\xF3n.');
    } else {
      agregarBurbuja('valeria', text || '⚠️ Sin respuesta.');
    }
  })
  .catch(function(err) {
    eliminarBurbujaThinking();
    agregarBurbuja('valeria', '❌ Error al consultar: ' + String(err));
    console.error('[PF] consultarValeria error:', err);
  })
  .finally(function() { _pensandoValeria = false; });
}

function enviarMensajeValeria() {
  if (_pensandoValeria) return;
  var input = document.getElementById('valeria-input');
  if (!input) return;
  var texto = input.value.trim();
  if (!texto) return;
  _pensandoValeria = true;
  input.value = '';
  agregarBurbuja('usuario', texto);
  _agregarChipHistorial(texto);

  if (!CLIENTES_DISPONIBLES.length) {
    agregarBurbuja('valeria', '⚠️ Primero carga los clientes desde el tab Clientes.');
    _pensandoValeria = false;
    return;
  }

  if (_esConsultaValeria(texto)) {
    consultarValeria(texto);
  } else {
    procesarInstruccionVoz(texto);
  }
}

function valeriaTecla(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarMensajeValeria();
  }
}

function agregarBurbuja(quien, texto, clase) {
  VALERIA_CHAT.push({ quien: quien, texto: texto, clase: clase || '' });
  if (VALERIA_CHAT.length > 100) VALERIA_CHAT = VALERIA_CHAT.slice(-100);
  renderChat();
}

function eliminarBurbujaThinking() {
  VALERIA_CHAT = VALERIA_CHAT.filter(function(b) { return b.clase !== 'thinking'; });
  renderChat();
}

function renderChat() {
  var chat = document.getElementById('valeria-chat');
  if (!chat) return;
  var html = '';
  VALERIA_CHAT.forEach(function(b, idx) {
    var esUsuario = b.quien === 'usuario';
    var tieneInstruccion = b.quien === 'valeria' && b.texto && b.texto.indexOf('--- INSTRUCCIÓN PARA CLAUDE ---') !== -1;
    var textoHtml = esc(b.texto).replace(/\n/g, '<br>');
    if (tieneInstruccion) {
      textoHtml = textoHtml
        .replace('--- INSTRUCCIÓN PARA CLAUDE ---', '<strong style="color:#7c3aed">--- INSTRUCCIÓN PARA CLAUDE ---</strong>')
        .replace('--- FIN INSTRUCCIÓN ---', '<strong style="color:#7c3aed">--- FIN INSTRUCCIÓN ---</strong>');
    }
    html += '<div class="chat-burbuja ' + (esUsuario ? 'chat-usuario' : 'chat-valeria') + (b.clase ? ' chat-' + b.clase : '') + '">'
      + '<div class="chat-texto">' + textoHtml + '</div>'
      + (tieneInstruccion ? '<button class="btn-copiar-instruccion" onclick="copiarInstruccionClaude(' + idx + ')">📋 Copiar instrucción para Claude</button>' : '')
      + '</div>';
  });
  chat.innerHTML = html;
  chat.scrollTop = chat.scrollHeight;
}

function copiarInstruccionClaude(idx) {
  var b = VALERIA_CHAT[idx];
  if (!b || !b.texto) return;
  var inicio = b.texto.indexOf('--- INSTRUCCIÓN PARA CLAUDE ---');
  if (inicio === -1) return;  // Stale index — bubble no longer contains instruction
  var fin = b.texto.indexOf('--- FIN INSTRUCCIÓN ---');
  var instruccion = fin > inicio
    ? b.texto.slice(inicio, fin + '--- FIN INSTRUCCIÓN ---'.length)
    : b.texto.slice(inicio);
  navigator.clipboard.writeText(instruccion).then(function() {
    showToast('✅ Instrucción copiada al portapapeles');
  }).catch(function() {
    var ta = document.createElement('textarea');
    ta.value = instruccion;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ Instrucción copiada');
  });
}

function _agregarChipHistorial(texto) {
  _chipHistorial = _chipHistorial.filter(function(c) { return c !== texto; });
  _chipHistorial.unshift(texto);
  if (_chipHistorial.length > 5) _chipHistorial = _chipHistorial.slice(0, 5);
  var cont = document.getElementById('valeria-chips');
  if (!cont) return;
  var html = '';
  _chipHistorial.forEach(function(c) {
    html += '<button class="valeria-chip" onclick="usarChip(this.getAttribute(\'data-val\'))" data-val="' + esc(c) + '">' + esc(c) + '</button>';
  });
  cont.innerHTML = html;
}

function usarChip(texto) {
  var input = document.getElementById('valeria-input');
  if (input) { input.value = texto; input.focus(); }
}

/* ===================================================
   DROPBOX FILE HELPERS
=================================================== */
function dbxDownload(path) {
  return _retryBackoff(function() {
    return getValidToken().then(function(token) {
      return fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Dropbox-API-Arg': JSON.stringify({ path: path })
        }
      }).then(function(r) {
        if (r.status === 401) throw new Error('Tu sesi\xF3n de Dropbox expir\xF3, reconecta en ⚙️ Config');
        if (r.status === 400 || r.status === 409) {
          return r.text().then(function(txt) {
            // Any 400/409 from Dropbox download = file inaccessible — log but don't retry
            console.warn('[PF] Dropbox ' + r.status + ' (' + path + '):', txt.slice(0, 150));
            return null;
          });
        }
        if (!r.ok) throw new Error('Dropbox ' + r.status + ' al descargar ' + path);
        return r.arrayBuffer();
      });
    });
  }, 3);
}

function dbxUpload(path, content) {
  return _retryBackoff(function() {
    return getValidToken().then(function(token) {
      return fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Dropbox-API-Arg': JSON.stringify({ path: path, mode: 'overwrite', autorename: false }),
          'Content-Type': 'application/octet-stream'
        },
        body: typeof content === 'string' ? content : JSON.stringify(content)
      }).then(function(r) {
        if (r.status === 401) throw new Error('Tu sesi\xF3n de Dropbox expir\xF3, reconecta en ⚙️ Config');
        if (r.status === 400 || r.status === 409) {
          return r.text().then(function(txt) {
            throw Object.assign(new Error('Dropbox upload ' + r.status + ': ' + txt.slice(0, 120)), { noRetry: true });
          });
        }
        if (!r.ok) throw new Error('Dropbox upload error ' + r.status);
        return r.json();
      });
    });
  }, 3);
}

/* Retry a promise-returning fn with exponential backoff: 2s, 4s, 8s */
function _retryBackoff(fn, maxIntentos) {
  maxIntentos = maxIntentos || 3;
  return new Promise(function(resolve, reject) {
    var intento = 0;
    function run() {
      fn().then(resolve).catch(function(err) {
        intento++;
        var msg = String(err && err.message || err);
        // Don't retry auth/expired errors — surface immediately
        if (intento >= maxIntentos || err.noRetry || /expir|reconecta|invalid_grant/i.test(msg)) { reject(err); return; }
        setTimeout(run, Math.pow(2, intento) * 1000);
      });
    }
    run();
  });
}

function dbxDownloadJSON(path) {
  return dbxDownload(path).then(function(buf) {
    if (buf === null) return {};
    try { return JSON.parse(new TextDecoder().decode(buf)); }
    catch(e) { console.error('[PF] JSON corrupto en ' + path, e); return {}; }
  });
}

/* ===================================================
   EXCEL PARSING (SheetJS)
=================================================== */
var MESES_NUM = {'1':'ENERO','2':'FEBRERO','3':'MARZO','4':'ABRIL','5':'MAYO','6':'JUNIO',
  '7':'JULIO','8':'AGOSTO','9':'SEPTIEMBRE','10':'OCTUBRE','11':'NOVIEMBRE','12':'DICIEMBRE',
  '01':'ENERO','02':'FEBRERO','03':'MARZO','04':'ABRIL','05':'MAYO','06':'JUNIO',
  '07':'JULIO','08':'AGOSTO','09':'SEPTIEMBRE','10':'OCTUBRE','11':'NOVIEMBRE','12':'DICIEMBRE'};

function parseExcel(buf) {
  var wb = XLSX.read(buf, { type: 'array' });
  // Prefer RESUMEN_LOCALES sheet: one row per local, N_EXTINTORES = real count, no TOTAL rows
  var resumenName = wb.SheetNames.find(function(n) { return /resumen/i.test(n); });
  if (resumenName) {
    var ws = wb.Sheets[resumenName];
    var rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
    rows.forEach(function(r) { r.__sheet = resumenName; r.__isResumen = true; });
    return rows;
  }
  // Fallback: read all sheets as DETALLE (one row per extintor)
  var allRows = [];
  wb.SheetNames.forEach(function(sheetName) {
    var ws = wb.Sheets[sheetName];
    var rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
    rows.forEach(function(r) { r.__sheet = sheetName; });
    allRows = allRows.concat(rows);
  });
  return allRows;
}

function parseExcelOtros(buf, mesSeleccionado) {
  var wb = XLSX.read(buf, { type: 'array' });
  var sheetTarget = null;
  // Map abbreviated month names to full names
  var MESES_ABREV = {
    'ENE':'ENERO','FEB':'FEBRERO','MAR':'MARZO','ABR':'ABRIL','MAY':'MAYO','JUN':'JUNIO',
    'JUL':'JULIO','AGO':'AGOSTO','SEP':'SEPTIEMBRE','SEPT':'SEPTIEMBRE','OCT':'OCTUBRE',
    'NOV':'NOVIEMBRE','DIC':'DICIEMBRE'
  };
  wb.SheetNames.forEach(function(name) {
    var upper = name.trim().toUpperCase();
    // Normalize by stripping digits/spaces/special chars to get the base word
    var base = upper.replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
    var fullName = MESES_ABREV[base] || base;
    // Also try normalizarMes
    var normalized = normalizarMes(name.trim());
    if (upper === mesSeleccionado || normalized === mesSeleccionado ||
        fullName === mesSeleccionado || upper.indexOf(mesSeleccionado) !== -1 ||
        mesSeleccionado.indexOf(base) !== -1) {
      sheetTarget = name;
    }
  });
  var sheetsToRead = sheetTarget ? [sheetTarget] : wb.SheetNames;
  var clientes = [];
  var FILAS_BASURA = /^(totales?\b|subtotales?\b|suma\b|parcial\b|cantidad\b|cant\b|tipo\b|extintores?\b|marca\b|descripcion\b|ubicacion\b|item\b|n[°º]|cc\b|\d)/i;
  sheetsToRead.forEach(function(sheetName) {
    var ws = wb.Sheets[sheetName];
    if (!ws) return;
    var raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    var nombreActual = '';
    raw.forEach(function(row) {
      var colA = String(row[0] || '').trim();
      var colC = String(row[2] || '').trim();
      var colD = String(row[3] || '').trim();
      // Forward-fill client name, but skip garbage names (TOTAL, SUBTOTAL, headers)
      if (colA && !FILAS_BASURA.test(colA)) nombreActual = colA;
      if (!nombreActual || FILAS_BASURA.test(nombreActual)) return;
      if (!colC && !colD) return;
      // Skip rows where colC looks like a header/garbage
      if (colC && FILAS_BASURA.test(colC)) return;
      clientes.push({
        nombre:       nombreActual,
        direccion:    String(row[1] || '').trim(),  // UBICACIÓN = col B
        extintores:   1,                             // each row = 1 extintor
        capacidadLbs: parseInt(colD) || 0,           // CAPACIDAD in lbs (for display)
        mes:          sheetTarget ? mesSeleccionado : normalizarMes(sheetName),
        local:        colC,                          // TIPO (CO2, PQS...)
        marca:        '',
        esKfc:        false
      });
    });
  });
  return clientes;
}

// Parser for SUSHICORP / NOE / KOBE style Excel
// Single sheet, columns: CC (col0), UBICACIÓN (col1), TIPO (col2), CAPACIDAD-lbs (col3), ..., Mes de trabajo (col16)
function parseExcelSushi(buf, mesSeleccionado) {
  var wb = XLSX.read(buf, { type: 'array' });
  var ws = wb.Sheets[wb.SheetNames[0]];
  var raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  var clientes = [];
  var FILAS_BASURA = /^(total\b|subtotal\b|suma\b|parcial\b|cantidad\b|cant\b|tipo\b|extintores?\b|marca\b|descripcion\b|item\b|n[°º]|cc\b|ubicacion\b|\d)/i;
  var nombreActual = '';
  var mesActual = '';
  raw.forEach(function(row) {
    var colA = String(row[0] || '').trim();
    var colB = String(row[1] || '').trim();
    var colC = String(row[2] || '').trim();
    var colD = String(row[3] || '').trim();
    var colQ = String(row[16] || '').trim(); // "Mes de trabajo"
    // Update current client name and month from first row of each client block
    if (colA && !FILAS_BASURA.test(colA)) {
      nombreActual = colA;
      var m = normalizarMes(colQ);
      if (m) mesActual = m;
    } else if (colQ) {
      var m2 = normalizarMes(colQ);
      if (m2) mesActual = m2;
    }
    if (!nombreActual || FILAS_BASURA.test(nombreActual)) return;
    if (!colC && !colD) return;
    if (mesSeleccionado && mesActual && mesActual !== mesSeleccionado) return;
    clientes.push({
      nombre:       nombreActual,
      direccion:    colB,
      extintores:   1,
      capacidadLbs: parseInt(colD) || 0,
      mes:          mesActual,
      local:        colC,
      marca:        '',
      esKfc:        false
    });
  });
  return clientes;
}

function normalizarMes(val) {
  // Handle Date objects directly (SheetJS returns date cells as Date objects)
  if (val instanceof Date && !isNaN(val)) {
    return MESES_NUM[String(val.getMonth() + 1)] || '';
  }
  // Handle Excel serial numbers (numeric dates)
  if (typeof val === 'number' && val > 1000) {
    try {
      var d = new Date(Math.round((val - 25569) * 86400 * 1000));
      if (!isNaN(d)) return MESES_NUM[String(d.getMonth() + 1)] || '';
    } catch(e) {}
  }
  var s = String(val).trim();
  if (!s || s === 'undefined' || s === 'null') return '';
  if (MESES_NUM[s]) return MESES_NUM[s];
  var up = s.toUpperCase();
  var ABREV = {
    'ENE':'ENERO','FEB':'FEBRERO','MAR':'MARZO','ABR':'ABRIL','MAY':'MAYO',
    'JUN':'JUNIO','JUL':'JULIO','AGO':'AGOSTO','SEP':'SEPTIEMBRE',
    'SEPT':'SEPTIEMBRE','OCT':'OCTUBRE','NOV':'NOVIEMBRE','DIC':'DICIEMBRE',
    'JAN':'ENERO','APR':'ABRIL','AUG':'AGOSTO','DEC':'DICIEMBRE'
  };
  if (ABREV[up]) return ABREV[up];
  // Scan ALL words in the string (handles "Sat Mar 01 2026..." from Date.toString())
  var words = up.split(/[\s\-\/\.\,\_]+/).map(function(w){ return w.replace(/[^A-Z]/g,''); });
  for (var j = 0; j < words.length; j++) {
    if (ABREV[words[j]]) return ABREV[words[j]];
  }
  // Handle full names with trailing year or spaces
  var FULL = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  for (var i = 0; i < FULL.length; i++) {
    if (up.indexOf(FULL[i]) !== -1) return FULL[i];
  }
  return up;
}

function normalizarCliente(row, esKfc) {
  var cols = Object.keys(row);
  function get() {
    for (var i = 0; i < arguments.length; i++) {
      var v = row[arguments[i]];
      if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  }
  var nombre = get('NOMBRE_LOCAL','CLIENTE','Cliente','NOMBRE','Nombre',
                   'RAZON SOCIAL','Raz\xF3n Social','RAZON_SOCIAL','RAZ\xD3N SOCIAL',
                   'EMPRESA','Empresa','ESTABLECIMIENTO','Establecimiento',
                   'RAZON','Razon','DENOMINACION','Denominacion');
  if (!nombre) {
    var nameCols = cols.filter(function(c) {
      return /nombre|cliente|razon|empresa|local|establec/i.test(c);
    });
    if (nameCols.length) nombre = String(row[nameCols[0]] || '').trim();
  }
  var dir = get('UBICACI\xD3N','UBICACION','DIRECCION','Direcci\xF3n','DIRECCI\xD3N',
                'DIR','Direccion','DIREC','direccion','DOMICILIO','Domicilio');
  var ciudad = get('CIUDAD','Ciudad','ciudad','CANTON','PROVINCIA');
  var ext = get('N_EXTINTORES','EXTINTORES','Extintores','CAPACIDAD','CANTIDAD','Cantidad',
                'EXT','N_EXT','NUMERO','N\xFAmero','CANT');
  // Get mes preserving original value (may be Date object from SheetJS)
  var mesRaw = (function() {
    var keys = ['MES_SERVICIO','MES','Mes','mes','MES_CONTRATO','PERIODO','Periodo'];
    for (var i = 0; i < keys.length; i++) {
      var v = row[keys[i]];
      if (v !== undefined && v !== null && v !== '') return v;
    }
    // Fallback: use the sheet tab name as month (KFC Excel organizes by sheet, not column)
    return row.__sheet || '';
  })();
  var mes = mesRaw;
  var local = get('LOCAL','Local','LOCAL_KFC','Sucursal','SUCURSAL','TIPO','Tipo','ZONA','Zona');
  var marca = get('MARCA','Marca','TIPO_EXT','TIPO EXTINTOR');
  return {
    nombre:       nombre,
    direccion:    (dir || '') + (ciudad ? (dir ? ' — ' : '') + ciudad : ''),
    extintores:   parseInt(ext) || 0,
    mes:          normalizarMes(mes),
    local:        local,
    marca:        marca,
    esKfc:        !!esKfc,
    __isResumen:  !!row.__isResumen
  };
}

function _normKey(nombre) {
  return (nombre || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/[^a-z0-9\s]/g, ' ')                       // punctuation → space
    .replace(/([a-z])(\d)/g, '$1 $2')                   // "m014" → "m 014", "g48" → "g 48"
    .replace(/\b0+(\d)/g, '$1')                         // strip leading zeros: "014" → "14"
    .replace(/\s+/g, ' ')
    .trim();
}


function deduplicarClientes(lista) {
  var mapa = {};
  var orden = [];
  lista.forEach(function(c) {
    if (!c.nombre) return;
    var key = _normKey(c.nombre);
    if (!mapa[key]) {
      mapa[key] = Object.assign({}, c, { tipos: [], extintores: 0, capacidadTotal: 0 });
      orden.push(key);
    }
    // Only add tag if it has a real extintor type (skip brand-only rows from headers/totals)
    // capacidadLbs = lbs capacity for display (from OTRAS_EMPRESAS/Sushi rows); extintores = count
    var dispCap = (c.capacidadLbs !== undefined) ? c.capacidadLbs : c.extintores;
    if (c.local && c.local.trim()) {
      mapa[key].tipos.push({ tipo: c.local, marca: c.marca || '', cap: dispCap });
    }
    if (!mapa[key].direccion && c.direccion) mapa[key].direccion = c.direccion;
    if (!mapa[key].marcaPrincipal && c.marca) mapa[key].marcaPrincipal = c.marca;
    if (c.esKfc) {
      if (c.__isResumen && c.extintores > 0) {
        // RESUMEN_LOCALES: N_EXTINTORES = real count per local
        mapa[key].extintores += c.extintores;
      } else {
        // DETALLE fallback: each row = 1 extintor
        mapa[key].extintores += 1;
      }
      mapa[key].capacidadTotal += dispCap;
    } else {
      // Otras Empresas / Sushicorp: each row = 1 extintor (extintores already = 1)
      mapa[key].extintores += c.extintores;
      mapa[key].capacidadTotal += dispCap;
    }
  });
  return orden.map(function(k) {
    var obj = mapa[k];
    // Dedup tipos: same tipo+marca+cap can appear multiple times from duplicate Excel rows
    var tiposVisto = {};
    obj.tipos = obj.tipos.filter(function(t) {
      var tk = (t.tipo + '|' + t.marca + '|' + t.cap);
      if (tiposVisto[tk]) return false;
      tiposVisto[tk] = true;
      return true;
    });
    return obj;
  });
}

/* ===================================================
   UTILITIES
=================================================== */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function fechaHoy() {
  var d  = new Date();
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  return dd + '/' + mm + '/' + d.getFullYear();
}

function fechaMas(dias) {
  var d = new Date();
  d.setDate(d.getDate() + dias);
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  return dd + '/' + mm + '/' + d.getFullYear();
}

function mostrarCargando(show) {
  var el = document.getElementById('cargando');
  if (el) el.classList[show ? 'remove' : 'add']('hidden');
  if (show) {
    document.body.style.overflow = 'hidden';
  } else {
    var modalOpen = document.getElementById('modal-overlay') && !document.getElementById('modal-overlay').classList.contains('hidden');
    if (!modalOpen) document.body.style.overflow = '';
  }
}

function pfModal(titulo, msg) {
  var overlay = document.getElementById('modal-overlay');
  var titleEl = document.getElementById('modal-title');
  var msgEl   = document.getElementById('modal-msg');
  var actEl   = document.getElementById('modal-actions');
  if (!overlay || !titleEl || !msgEl || !actEl) return;
  titleEl.textContent = titulo;
  msgEl.innerHTML = esc(msg).replace(/\n/g, '<br>');
  actEl.innerHTML = '';
  var btn = document.createElement('button');
  btn.className = 'btn-primary';
  btn.textContent = 'OK';
  btn.onclick = function() { overlay.classList.add('hidden'); document.body.style.overflow = ''; };
  actEl.appendChild(btn);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function pfConfirm(titulo, msg, cb) {
  var overlay = document.getElementById('modal-overlay');
  var titleEl = document.getElementById('modal-title');
  var msgEl   = document.getElementById('modal-msg');
  var actEl   = document.getElementById('modal-actions');
  if (!overlay || !titleEl || !msgEl || !actEl) return;
  titleEl.textContent = titulo;
  msgEl.innerHTML = esc(msg).replace(/\n/g, '<br>');
  actEl.innerHTML = '';
  var btnCancel = document.createElement('button');
  btnCancel.className = 'btn-ghost';
  btnCancel.textContent = 'Cancelar';
  btnCancel.onclick = function() { overlay.classList.add('hidden'); document.body.style.overflow = ''; };
  var btnOk = document.createElement('button');
  btnOk.className = 'btn-primary';
  btnOk.textContent = 'Confirmar';
  btnOk.onclick = function() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    if (typeof cb === 'function') cb();
  };
  actEl.appendChild(btnCancel);
  actEl.appendChild(btnOk);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function showToast(msg) {
  _toastQueue.push(msg);
  if (_toastQueue.length > 3) _toastQueue = _toastQueue.slice(-3);
  if (!_toastShowing) _processToastQueue();
}

function _processToastQueue() {
  if (!_toastQueue.length) { _toastShowing = false; return; }
  _toastShowing = true;
  var msg = _toastQueue.shift();
  var el = document.getElementById('toast');
  if (!el) { _toastShowing = false; return; }
  el.textContent = msg;
  el.classList.add('visible');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() {
    el.classList.remove('visible');
    setTimeout(_processToastQueue, 350);
  }, 2800);
}

/* ===================================================
   NAVIGATION
=================================================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  var t = document.getElementById(id);
  if (t) t.classList.add('active');
}

function login(usuario) {
  if (!USUARIOS[usuario]) return;
  var savedRaul = localStorage.getItem('pf_nombre_raul');
  var savedJuan = localStorage.getItem('pf_nombre_juan');
  if (savedRaul) USUARIOS.raul.nombre = savedRaul;
  if (savedJuan) USUARIOS.juan.nombre = savedJuan;

  USUARIO_ACTUAL = usuario;
  localStorage.setItem('pf_usuario', usuario);
  if (USUARIOS[usuario].esAdmin) {
    var fechaEl = document.getElementById('admin-fecha');
    if (fechaEl) fechaEl.textContent = fechaHoy();
    showScreen('sadmin');
    var mesSelect = document.getElementById('admin-mes');
    if (mesSelect) {
      var meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
      // Always default to the CURRENT calendar month — don't restore a stale saved month
      // that may have no data, which was the root cause of the "0/0 clients" bug on login
      mesSelect.value = meses[new Date().getMonth()];
    }
    _mesUltimoCargado = '';
    _inicializarArchivosDropbox();
    sincronizarConfig();
    sincronizarValeria();
    actualizarEstadoConexion();
    cargarClientes();
    _initAdminRutaStatus();
  } else {
    var titleEl = document.getElementById('s1-title');
    if (titleEl) titleEl.textContent = USUARIOS[usuario].emoji + ' ' + USUARIOS[usuario].nombre;
    cargarRecorrido();
  }
}

function logout() {
  detenerSeguimiento();
  if (_DICTAR_REC) { try { _DICTAR_REC.abort(); } catch(e) {} _DICTAR_REC = null; }
  if (_currentRec) { try { _currentRec.abort(); } catch(e) {} _currentRec = null; }
  if (_undoTimer) { clearTimeout(_undoTimer); _undoTimer = null; }
  if (_guardarVisitasTimer) { clearTimeout(_guardarVisitasTimer); _guardarVisitasTimer = null; }
  if (_filtroClientesTimer) { clearTimeout(_filtroClientesTimer); _filtroClientesTimer = null; }
  if (_subirFichasTimer) { clearTimeout(_subirFichasTimer); _subirFichasTimer = null; }
  if (_toastTimer) { clearTimeout(_toastTimer); _toastTimer = null; }
  _toastQueue = []; _toastShowing = false;
  _pensandoValeria = false;
  _sincronizarValeriaP = Promise.resolve();
  _subirFichasPending = false;
  _subirFichasReintentos = 0;
  _cargandoClientes = false;
  _cargandoClientesGen++;  // Invalidate any in-flight cargarClientes response
  _mesUltimoCargado = '';
  USUARIO_ACTUAL = null;
  PUNTOS = [];
  CLIENTES_DISPONIBLES = [];
  VISITAS_MES = {};
  RUTA_PREVIEW = [];
  VALERIA_CHAT = [];
  VALERIA_MEMORIA = {};
  _DICTAR_PUNTOS = [];
  _chipHistorial = [];
  _clientesFiltro = '';
  _clientesQuickFilter = 'todos';
  _obsClasifCache = {};
  _segPuntosCache = [];
  localStorage.removeItem('pf_usuario');
  switchTab('clientes');
  showScreen('s0');
}

function _initAdminRutaStatus() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_RECORRIDOS).then(function(rec) {
    var hoy = rec[fechaHoy()];
    if (!hoy || !hoy.puntos || !hoy.puntos.length) return;
    var total = hoy.puntos.length;
    var done = hoy.puntos.filter(function(p) { return p.done; }).length;
    var el = document.getElementById('admin-ruta-status');
    if (el) {
      el.textContent = done + '/' + total;
      el.classList.remove('hidden');
    }
  }).catch(function() {});
}

/* ===================================================
   ADMIN — TABS
=================================================== */
function switchTab(tab) {
  ['clientes', 'valeria', 'seguimiento', 'config'].forEach(function(t) {
    var c = document.getElementById('tab-' + t);
    var b = document.getElementById('tab-btn-' + t);
    if (c) c.classList.remove('active');
    if (b) b.classList.remove('active');
  });
  var ac = document.getElementById('tab-' + tab);
  var ab = document.getElementById('tab-btn-' + tab);
  if (ac) ac.classList.add('active');
  if (ab) ab.classList.add('active');
  if (tab === 'seguimiento') iniciarSeguimiento(); else detenerSeguimiento();
  if (tab === 'config') actualizarEstadoConexion();
  if (tab === 'valeria' && VALERIA_CHAT.length === 0) {
    agregarBurbuja('valeria', 'Hola! Soy Valeria 🤖 Puedo crear rutas por voz o texto, y responder preguntas sobre el historial. \xBFQu\xE9 necesitas hoy?');
  }
}

/* ===================================================
   ADMIN — CLIENTES DEL MES
=================================================== */
function _claveMesActual() {
  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : 'JUNIO';
  return mes + '_' + new Date().getFullYear();
}

function _mostrarOverlayClientes(show) {
  var cont = document.getElementById('clientes-mes-lista');
  if (!cont) return;
  var ov = document.getElementById('clientes-loading-overlay');
  if (show) {
    cont.style.position = 'relative';
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'clientes-loading-overlay';
      ov.className = 'clientes-loading-overlay';
      ov.innerHTML = '<div class="spinner-sm"></div><span>Actualizando...</span>';
      cont.appendChild(ov);
    }
    ov.style.display = 'flex';
  } else if (ov) {
    ov.style.display = 'none';
  }
}

/* Error log — keep last 10 errors in localStorage */
function _logError(contexto, err) {
  try {
    var log = JSON.parse(localStorage.getItem('pf_error_log') || '[]');
    log.unshift({ ts: new Date().toLocaleString('es-EC'), ctx: contexto, msg: String(err && err.message || err) });
    if (log.length > 10) log = log.slice(0, 10);
    localStorage.setItem('pf_error_log', JSON.stringify(log));
  } catch(e) {}
}

var _cargandoClientes = false;
var _cargandoClientesGen = 0;  // Generation counter to discard stale responses
var _mesUltimoCargado = '';

function cargarClientes() {
  if (!getRefreshToken()) {
    var cont = document.getElementById('clientes-mes-lista');
    if (cont) cont.innerHTML = '<div class="no-clientes"><strong>&#9888; Conecta Dropbox primero</strong><br><small>Ve al tab &#9881; Config y pulsa "Conectar con Dropbox".</small><br><button class="btn-primary" style="margin-top:12px" onclick="switchTab(\'config\')">Ir a Config</button></div>';
    return;
  }
  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : '';

  if (_cargandoClientes) return;
  _cargandoClientes = true;
  _cargandoClientesGen++;
  var genActual = _cargandoClientesGen;
  var _lockTimeout = setTimeout(function() { if (genActual === _cargandoClientesGen) _cargandoClientes = false; }, 15000);

  if (mes !== _mesUltimoCargado && _mesUltimoCargado !== '') {
    _clientesFiltro = '';
    var buscarEl = document.getElementById('clientes-buscar');
    if (buscarEl) buscarEl.value = '';
  }

  var sk = document.getElementById('skeleton-lista');
  if (sk) sk.style.display = 'flex';
  mostrarCargando(true);

  // Filter embedded BD by month
  var filtrados = CLIENTES_BD.filter(function(c) {
    return !mes || c.mes === mes;
  });

  // Enrich entries with expected fields
  var nuevosClientes = filtrados.map(function(c) {
    return {
      nombre:        c.nombre,
      marca:         c.marca || '',
      marcaPrincipal: c.marca || '',
      mes:           c.mes,
      extintores:    c.extintores,
      tipos:         (c.tipos || []),
      esKfc:         !!c.esKfc,
      fuente:        c.fuente || '',
      direccion:     c.direccion || '',
      local:         '',
      capacidadTotal: (c.tipos || []).reduce(function(s, t) { return s + (t.cap || 0); }, 0)
    };
  });

  // Download only visitas.json from Dropbox (runtime data, not Excel)
  dbxDownloadJSON(DBX_VISITAS).then(function(data) {
    if (genActual !== _cargandoClientesGen) return;  // Stale — newer load in progress
    clearTimeout(_lockTimeout);
    _cargandoClientes = false;
    mostrarCargando(false);
    if (sk) sk.style.display = 'none';
    _mostrarOverlayClientes(false);

    _mesUltimoCargado = mes;
    var claveMes = _claveMesActual();
    VISITAS_MES = (data || {})[claveMes] || {};

    if (nuevosClientes.length > 0) {
      CLIENTES_DISPONIBLES = nuevosClientes;
    } else {
      CLIENTES_DISPONIBLES = [];
      var cont = document.getElementById('clientes-mes-lista');
      if (cont) cont.innerHTML = '<div class="no-clientes"><strong>\ud83d\udcad Sin clientes para ' + esc(mes) + '</strong><br><small>No hay datos para este mes en la base de datos.</small></div>';
      return;
    }
    renderClientesMes();
    try { sugerenciaProactiva(); } catch(e) {}
  }).catch(function(err) {
    if (genActual !== _cargandoClientesGen) return;  // Stale — newer load in progress
    clearTimeout(_lockTimeout);
    _cargandoClientes = false;
    mostrarCargando(false);
    if (sk) sk.style.display = 'none';
    // Visitas failed — still show clients, just without visit state
    VISITAS_MES = {};
    CLIENTES_DISPONIBLES = nuevosClientes;
    renderClientesMes();
  });
}
/* Load all months — escape hatch when the selected month has no data */
function cargarTodosSinFiltro() {
  var mesEl = document.getElementById('admin-mes');
  var MESES = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  var actual = new Date().getMonth();
  var cont = document.getElementById('clientes-mes-lista');
  if (cont) cont.innerHTML = '<div class="no-clientes">🔍 Buscando mes con datos...</div>';
  if (mesEl) mesEl.value = MESES[actual];
  _cargandoClientes = false;
  _mesUltimoCargado = '';
  cargarClientes();
}

function _guardarVisitas() {
  if (!getRefreshToken()) return;
  if (_guardarVisitasTimer) clearTimeout(_guardarVisitasTimer);
  var clave = _claveMesActual();
  var snapshot = JSON.parse(JSON.stringify(VISITAS_MES));  // Capture now — VISITAS_MES may reset if user switches months before timer fires
  _guardarVisitasTimer = setTimeout(function() {
    dbxDownloadJSON(DBX_VISITAS)
    .then(function(data) { data[clave] = snapshot; return dbxUpload(DBX_VISITAS, JSON.stringify(data, null, 2)); })
    .catch(function(e) { console.error('[PF] guardarVisitas error:', e); });
  }, 500);
}

function marcarVisitado(idx) {
  var c = CLIENTES_DISPONIBLES[idx];
  if (!c) return;
  var key = c.nombre;
  if (VISITAS_MES[key] && VISITAS_MES[key].visitado) {
    delete VISITAS_MES[key];
  } else {
    VISITAS_MES[key] = { visitado: true, fecha: fechaHoy() };
  }
  renderClientesMes();
  _guardarVisitas();
}

function marcarTodosKfc() {
  pfConfirm('Marcar todos KFC', '\xBFMarcar todos los clientes KFC como visitados?', function() {
    CLIENTES_DISPONIBLES.forEach(function(c) {
      if (c.esKfc) VISITAS_MES[c.nombre] = { visitado: true, fecha: fechaHoy() };
    });
    renderClientesMes();
    _guardarVisitas();
    showToast('✅ Todos los KFC marcados como visitados');
  });
}

function marcarTodosOtros() {
  pfConfirm('Marcar todos Otros', '\xBFMarcar todos los clientes Otros como visitados?', function() {
    CLIENTES_DISPONIBLES.forEach(function(c) {
      if (!c.esKfc) VISITAS_MES[c.nombre] = { visitado: true, fecha: fechaHoy() };
    });
    renderClientesMes();
    _guardarVisitas();
    showToast('✅ Todos los Otros marcados como visitados');
  });
}

function exportarVisitados() {
  var visitados = CLIENTES_DISPONIBLES.filter(function(c) {
    return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado;
  });
  if (!visitados.length) { showToast('⚠️ No hay visitados a\xFAn'); return; }
  var texto = 'Clientes visitados ' + _claveMesActual() + ':\n'
    + visitados.map(function(c) { return '- ' + c.nombre + ' (' + (VISITAS_MES[c.nombre].fecha || '') + ')'; }).join('\n');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto)
      .then(function() { showToast('✅ Lista copiada al portapapeles'); })
      .catch(function() { pfModal('Lista visitados', texto); });
  } else {
    pfModal('Lista visitados', texto);
  }
}

var _filtroClientesTimer = null;
function filtrarClientesMes() {
  var input = document.getElementById('clientes-buscar');
  _clientesFiltro = input ? input.value.trim().toLowerCase() : '';
  if (_filtroClientesTimer) clearTimeout(_filtroClientesTimer);
  _filtroClientesTimer = setTimeout(renderClientesMes, 300);
}

function scrollToTop() {
  var lista = document.getElementById('tab-clientes');
  if (lista) lista.scrollTop = 0;
}

function renderClientesMes() {
  var cont  = document.getElementById('clientes-mes-lista');
  var stats = document.getElementById('clientes-mes-stats');
  if (!cont) return;
  if (!CLIENTES_DISPONIBLES || !CLIENTES_DISPONIBLES.length) {
    cont.innerHTML = '<div class="no-clientes">No hay clientes para este mes.</div>';
    if (stats) stats.innerHTML = '';
    return;
  }

  var lista = CLIENTES_DISPONIBLES;
  if (_clientesFiltro) {
    lista = lista.filter(function(c) {
      return c.nombre.toLowerCase().indexOf(_clientesFiltro) !== -1
        || (c.direccion || '').toLowerCase().indexOf(_clientesFiltro) !== -1;
    });
  }

  var kfcList   = lista.filter(function(c) { return c.esKfc; });
  var otrosList = lista.filter(function(c) { return !c.esKfc; });
  var kfcVisit  = kfcList.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; }).length;
  var otroVisit = otrosList.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; }).length;
  var totalVisit = kfcVisit + otroVisit;
  var totalPend  = lista.length - totalVisit;

  var pctMes = lista.length > 0 ? Math.round(totalVisit / lista.length * 100) : 0;
  var mesElLbl = document.getElementById('admin-mes');
  var mesLbl = mesElLbl ? mesElLbl.value : '';

  if (stats) {
    stats.innerHTML = '<div class="mes-cargado-chip">📅 Cargado: ' + esc(mesLbl) + ' ' + new Date().getFullYear() + '</div>'
      + '<div class="mes-progress"><div class="mes-progress-bar" style="width:' + pctMes + '%"></div></div>'
      + '<div class="mes-progress-label">' + pctMes + '% del mes completado</div>'
      + '<div class="mes-stats">'
      + '<span class="mes-stat-ok">✓ ' + totalVisit + ' visitados</span>'
      + '<span class="mes-stat-pend">⏳ ' + totalPend + ' pendientes</span>'
      + '</div>'
      + '<div class="mes-stats" style="margin-top:4px">'
      + '<span class="mes-stat-kfc">KFC: ' + kfcVisit + '/' + kfcList.length + '</span>'
      + '<span class="mes-stat-otros">Otros: ' + otroVisit + '/' + otrosList.length + '</span>'
      + '</div>'
      + '<div class="mes-archivos">'
      + '&#x1F4BE; Base de datos embebida &nbsp;&mdash;&nbsp; KFC + Otras Empresas + Sushicorp (' + CLIENTES_DISPONIBLES.length + ' en ' + esc(mesLbl) + ' / ' + CLIENTES_BD.length + ' total)'
      + '</div>';
  }

  var visitados  = lista.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; });
  var pendientes = lista.filter(function(c) { return !(VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado); });

  // Update pending count badge on Clientes tab button
  var pendBadge = document.getElementById('tab-badge-clientes');
  if (pendBadge) {
    if (pendientes.length > 0) { pendBadge.textContent = pendientes.length; pendBadge.style.display = 'inline-block'; }
    else { pendBadge.style.display = 'none'; }
  }

  var html = '';
  if (_clientesQuickFilter !== 'visitados' && pendientes.length) {
    html += '<div class="clientes-grupo-header">⏳ Pendientes (' + pendientes.length + ')</div>';
    pendientes.forEach(function(c) {
      var globalIdx = CLIENTES_DISPONIBLES.indexOf(c);
      html += renderClienteMesCard(c, globalIdx, false);
    });
  }
  if (_clientesQuickFilter !== 'pendientes' && visitados.length) {
    html += '<div class="clientes-grupo-header">✓ Visitados (' + visitados.length + ')</div>';
    visitados.forEach(function(c) {
      var globalIdx = CLIENTES_DISPONIBLES.indexOf(c);
      html += renderClienteMesCard(c, globalIdx, true);
    });
  }
  if (!html) {
    if (_clientesFiltro) {
      // Filter returned 0 — auto-clear it so clients don't "disappear"
      _clientesFiltro = '';
      var buscarEl2 = document.getElementById('clientes-buscar');
      if (buscarEl2) buscarEl2.value = '';
      // Re-render without filter
      renderClientesMes();
      return;
    }
    html = '<div class="no-clientes">Sin clientes para este mes.</div>';
  }
  cont.innerHTML = html;
}

function renderClienteMesCard(c, idx, visitado) {
  // Show actual brand badge: KFC, AMERICAN DELI, GUS, IL CAPPO, etc.
  var badgeMarca = (c.marcaPrincipal || (c.esKfc ? 'KFC' : '')).toUpperCase();
  var badgeCls = badgeMarca === 'KFC' ? 'badge-kfc' : 'badge-kfc badge-brand-otro';
  var badge = badgeMarca ? '<span class="' + badgeCls + '">' + esc(badgeMarca) + '</span>' : '';
  var fechaV = visitado && VISITAS_MES[c.nombre] ? ' \xB7 ' + esc(VISITAS_MES[c.nombre].fecha || '') : '';
  var tiposHtml = '';
  if (c.tipos && c.tipos.length) {
    var principalUp = (c.marcaPrincipal || '').toUpperCase();
    tiposHtml = '<div class="cliente-tipos">'
      + c.tipos.map(function(t) {
          // Show tipo (CO2/PQS/TIPO K) + marca only when marca ≠ client's own brand (avoid redundancy)
          var marcaTag = (t.marca && t.marca.toUpperCase() !== principalUp) ? t.marca : '';
          var partes = [t.tipo, marcaTag].filter(function(x){ return x && x.trim(); });
          var label = partes.join(' ');
          var capStr = t.cap ? ' <span class="tipo-cap">' + t.cap + 'lb</span>' : '';
          return '<span class="cliente-tipo-tag">' + esc(label || '—') + capStr + '</span>';
        }).join('')
      + '</div>';
  }

  // Alerta 30 dias sin recorrido
  var alerta30 = '';
  var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
  if (patron && patron.ultimo_recorrido && !visitado) {
    var partes = patron.ultimo_recorrido.split('/');
    if (partes.length === 3) {
      var ultimaVisita = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
      var diasPasados = Math.floor((new Date() - ultimaVisita) / (1000 * 60 * 60 * 24));
      if (diasPasados >= 30) alerta30 = ' <span class="alerta-30d">⚠️ ' + diasPasados + 'd</span>';
    }
  }

  var historialStr = '';
  if (patron && (patron.veces_en_ruta || patron.ultimo_recorrido)) {
    historialStr = '<div class="cliente-historial">'
      + (patron.veces_en_ruta ? '📅 ' + patron.veces_en_ruta + 'x' : '')
      + (patron.ultimo_recorrido ? ' \xB7 \xDAlt: ' + esc(patron.ultimo_recorrido) : '')
      + (patron.tecnico_habitual ? ' \xB7 ' + esc(patron.tecnico_habitual) : '')
      + '</div>';
  }

  var nombreHtml = _resaltar(c.nombre, _clientesFiltro);
  var dirHtml = c.direccion ? _resaltar(c.direccion, _clientesFiltro) : '';
  var tipoBorde = c.esKfc ? ' card-kfc' : ' card-otros';
  var ultVisStr = visitado && VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].fecha
    ? '<div class="cliente-ultvisita">🗓️ Última visita: ' + esc(VISITAS_MES[c.nombre].fecha) + '</div>' : '';

  return '<div class="cliente-mes-card' + (visitado ? ' visitado' : '') + tipoBorde + '">'
    + '<div class="cliente-mes-info">'
    +   '<div class="cliente-nombre">' + badge + ' ' + nombreHtml + alerta30 + '</div>'
    +   (dirHtml ? '<div class="cliente-dir">' + dirHtml + '</div>' : '')
    +   tiposHtml
    +   '<div class="cliente-ext">🧯 ' + (c.extintores || '?') + ' extintor(es)' + (c.esKfc && c.capacidadTotal ? ' · ' + c.capacidadTotal + 'lb total' : '') + '</div>'
    +   ultVisStr
    +   historialStr
    + '</div>'
    + '<button class="btn-visitado' + (visitado ? ' btn-visitado-done' : '') + '" onclick="marcarVisitado(' + idx + ')">'
    +   (visitado ? '✓' + fechaV : 'Marcar')
    + '</button>'
    + '</div>';
}

function _resaltar(texto, filtro) {
  if (!texto) return '';
  if (!filtro) return esc(texto);
  try {
    var re = new RegExp('(' + filtro.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    var partes = texto.split(re);
    return partes.map(function(p, i) {
      return (i % 2 === 1) ? '<mark class="hl">' + esc(p) + '</mark>' : esc(p);
    }).join('');
  } catch(e) { return esc(texto); }
}

/* ===================================================
   ADMIN — VOZ + GROQ (used by Valeria)
=================================================== */
function iniciarVoz() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    pfModal('No disponible', 'Tu navegador no soporta reconocimiento de voz. Usa Chrome en Android o iOS.');
    return;
  }
  if (!CLIENTES_DISPONIBLES.length) {
    pfModal('Sin clientes', 'Primero carga los clientes en el tab "Clientes".');
    return;
  }
  var btn = document.getElementById('btn-mic');
  if (_currentRec) {
    _currentRec.abort();
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
    return;
  }
  // Abort dictation mic if active
  if (_DICTAR_REC) { try { _DICTAR_REC.abort(); } catch(e) {} _DICTAR_REC = null; }
  if (btn) { btn.classList.add('grabando'); btn.innerHTML = '⏹'; }

  var rec = new SpeechRecognition();
  _currentRec = rec;
  rec.lang = 'es-EC';
  rec.continuous = false;
  rec.interimResults = false;
  rec.onresult = function(e) {
    var texto = e.results[0][0].transcript;
    var conf = Math.round((e.results[0][0].confidence || 0) * 100);
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
    _currentRec = null;
    var input = document.getElementById('valeria-input');
    if (input) input.value = '';
    agregarBurbuja('usuario', texto + (conf ? ' (' + conf + '% confianza)' : ''));
    _agregarChipHistorial(texto);
    _ultimaInstruccionVoz = texto;
    if (_pensandoValeria) { agregarBurbuja('valeria', '⏳ Espera, aún estoy procesando la instrucción anterior...'); return; }
    _pensandoValeria = true;
    if (_esConsultaValeria(texto)) {
      consultarValeria(texto);
    } else {
      procesarInstruccionVoz(texto);
    }
  };
  rec.onerror = function(e) {
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
    agregarBurbuja('valeria', '⚠️ Error de micr\xF3fono: ' + e.error);
  };
  rec.onend = function() {
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
  };
  rec.start();
}

function procesarInstruccionVoz(texto) {
  agregarBurbuja('valeria', '⏳ Procesando con Groq AI...', 'thinking');
  _ultimaInstruccionVoz = texto;

  var clientesCtx = CLIENTES_DISPONIBLES.map(function(c, i) {
    var visitado = VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado ? 'VISITADO' : 'PENDIENTE';
    var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
    var extraCtx = patron ? ' [veces:' + (patron.veces_en_ruta||0) + ',\xFAlt:' + (patron.ultimo_recorrido||'—') + ',tecnico:' + (patron.tecnico_habitual||'—') + ']' : '';
    return i + '. [' + (c.esKfc ? 'KFC' : 'OTRO') + '] ' + c.nombre
      + (c.local ? ' (' + c.local + ')' : '') + ' - ' + c.direccion + ' [' + visitado + ']' + extraCtx;
  }).join('\n');

  var historialCtx = (VALERIA_MEMORIA.historial_rutas || []).slice(0, 10).map(function(h) {
    return h.fecha + ': ' + (h.clientes || []).join(', ');
  }).join('\n');

  var systemMsg = 'Eres Valeria, asistente de rutas para Previfuego. '
    + 'Responde \xDANICAMENTE con un array JSON de \xEDndices num\xE9ricos. Ejemplo: [0, 3, 7]. '
    + 'No incluyas ning\xFAn texto adicional.';

  var userMsg = 'Fecha actual: ' + fechaHoy() + '\n\n'
    + '=== HISTORIAL RECIENTE ===\n' + (historialCtx || '(sin historial)') + '\n\n'
    + '=== CLIENTES DISPONIBLES ===\n' + clientesCtx + '\n\n'
    + 'Instrucci\xF3n del administrador: "' + texto + '"\n\n'
    + 'Selecciona los clientes para el recorrido seg\xFAn la instrucci\xF3n y responde solo con el array JSON de \xEDndices.';

  _llamarGroq([
    { role: 'system', content: systemMsg },
    { role: 'user', content: userMsg }
  ], 2048, 0.1)
  .then(function(d) {
    eliminarBurbujaThinking();
    if (d.error) throw new Error(d.error.message || 'Error Groq API');
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    // Robust array parse: match full array, or a truncated one and salvage it
    var match = text.match(/\[[\d,\s-]*\]/);
    var arrStr;
    if (match) {
      arrStr = match[0];
    } else {
      var partial = text.match(/\[[\d,\s-]*/);
      if (!partial) throw new Error('Respuesta inesperada de Groq: ' + text.slice(0, 100));
      arrStr = partial[0].replace(/[,\s]+$/, '') + ']';
    }
    var indices = JSON.parse(arrStr);
    RUTA_PREVIEW = indices
      .filter(function(i) { return Number.isInteger(i) && i >= 0 && i < CLIENTES_DISPONIBLES.length; })
      .map(function(i) { return Object.assign({}, CLIENTES_DISPONIBLES[i]); });
    if (!RUTA_PREVIEW.length) {
      agregarBurbuja('valeria', '⚠️ No encontr\xE9 clientes para esa instrucci\xF3n.');
      return;
    }
    agregarBurbuja('valeria', '✅ ' + RUTA_PREVIEW.length + ' cliente(s) seleccionados. Asigna t\xE9cnicos en la vista previa y pulsa Publicar.');
    if (RUTA_PREVIEW.length > 20) {
      agregarBurbuja('valeria', '⚠️ Aviso: la ruta tiene m\xE1s de 20 puntos. Considera dividirla.');
    }
    renderRutaPreview();
  })
  .catch(function(err) {
    eliminarBurbujaThinking();
    agregarBurbuja('valeria', '❌ Error: ' + String(err));
    console.error('[PF] Groq error:', err);
  })
  .finally(function() { _pensandoValeria = false; });
}

function renderRutaPreview() {
  var wrap  = document.getElementById('ruta-preview');
  var lista = document.getElementById('ruta-preview-lista');
  var title = document.getElementById('ruta-preview-title');
  if (!wrap || !lista) return;
  if (!RUTA_PREVIEW.length) { wrap.style.display = 'none'; return; }
  if (title) title.textContent = 'Ruta sugerida — ' + RUTA_PREVIEW.length + ' punto(s)';
  var html = '';
  RUTA_PREVIEW.forEach(function(c, i) {
    var badge = c.esKfc ? '<span class="badge-kfc">KFC</span>' : '';
    var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
    var histHtml = patron && patron.ultimo_recorrido
      ? '<div style="font-size:0.72rem;color:#888;margin-top:2px">📅 ' + (patron.veces_en_ruta||0) + 'x \xB7 \xDAlt: ' + esc(patron.ultimo_recorrido) + (patron.tecnico_habitual ? ' \xB7 ' + esc(patron.tecnico_habitual) : '') + '</div>'
      : '';
    var tecnicoHabitual = patron && patron.tecnico_habitual ? patron.tecnico_habitual : USUARIOS.raul.nombre;
    var tecNombres = [USUARIOS.raul.nombre, USUARIOS.juan.nombre];
    var selectOpts = tecNombres.map(function(t) {
      return '<option' + (t === tecnicoHabitual ? ' selected' : '') + '>' + esc(t) + '</option>';
    }).join('');
    html += '<div class="ruta-preview-item">'
      + '<div class="ruta-preview-num">' + (i + 1) + '</div>'
      + '<div class="ruta-preview-info" style="flex:1;min-width:0">'
      +   '<div class="cliente-nombre">' + badge + esc(c.nombre) + (c.local ? ' \xB7 ' + esc(c.local) : '') + '</div>'
      +   '<div class="cliente-dir">' + esc(c.direccion) + '</div>'
      +   histHtml
      +   '<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">'
      +     '<select class="opts-select" id="rtecnico-' + i + '" style="width:80px;font-size:0.82rem;padding:4px">' + selectOpts + '</select>'
      +     '<input type="text" id="rnota-' + i + '" class="opts-input" placeholder="Nota..." style="flex:1;font-size:0.78rem;padding:4px 8px;min-width:80px">'
      +     '<label style="font-size:0.75rem;display:flex;align-items:center;gap:4px;cursor:pointer;white-space:nowrap">'
      +       '<input type="checkbox" id="rpriority-' + i + '"> 🔴 Urgente'
      +     '</label>'
      +   '</div>'
      + '</div>'
      + '<button onclick="quitarPuntoPreview(' + i + ')" style="background:none;border:none;cursor:pointer;color:#bbb;font-size:1.1rem;padding:4px 6px;flex-shrink:0">✕</button>'
      + '</div>';
  });
  lista.innerHTML = html;
  wrap.style.display = 'flex';
  setTimeout(function() { if (wrap.scrollIntoView) wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
}

function quitarPuntoPreview(i) {
  RUTA_PREVIEW.splice(i, 1);
  if (!RUTA_PREVIEW.length) {
    var wrap = document.getElementById('ruta-preview');
    if (wrap) wrap.style.display = 'none';
    return;
  }
  renderRutaPreview();
}

function agregarPuntoManual() {
  pfModal('Agregar punto manual', 'Para agregar un cliente que no est\xE1 en la base de datos, escr\xEDbelo en el chat: "agrega [nombre] en [dirección]".');
}

/* ===================================================
   MODO DICTAR RECORRIDO — crea puntos estructurados por voz
=================================================== */
var _DICTAR_PUNTOS = [];  // Array of structured point objects
var _DICTAR_REC = null;   // Active SpeechRecognition

function abrirModoRecorrido() {
  // Abort Valeria mic if active before switching to dictation mode
  if (_currentRec) { try { _currentRec.abort(); } catch(e) {} _currentRec = null; var bm = document.getElementById('btn-mic'); if (bm) { bm.classList.remove('grabando'); bm.innerHTML = '🎤'; } }
  var panelChat = document.getElementById('modo-chat-valeria');
  var panelDictar = document.getElementById('modo-recorrido-panel');
  if (panelChat) panelChat.style.display = 'none';
  if (panelDictar) panelDictar.style.display = 'flex';
  _renderDictarPuntos();
  if (!_DICTAR_PUNTOS.length) {
    _dictatStatus('Pulsa el micr\xF3fono y describe el primer punto.');
  } else {
    _dictatStatus(_DICTAR_PUNTOS.length + ' punto(s) en espera. Pulsa mic\xF3fono para agregar m\xE1s.');
  }
}

function salirModoRecorrido() {
  if (_DICTAR_REC) { try { _DICTAR_REC.abort(); } catch(e) {} _DICTAR_REC = null; }
  var panelChat = document.getElementById('modo-chat-valeria');
  var panelDictar = document.getElementById('modo-recorrido-panel');
  if (panelChat) panelChat.style.display = 'flex';
  if (panelDictar) panelDictar.style.display = 'none';
}

function _dictatStatus(msg, color) {
  var el = document.getElementById('dictar-status');
  if (el) { el.textContent = msg; el.style.color = color || '#555'; }
}

function _renderDictarPuntos() {
  var lista = document.getElementById('dictar-puntos-lista');
  var badge = document.getElementById('dictar-count-badge');
  var btn = document.getElementById('btn-publicar-dictado');
  if (badge) badge.textContent = _DICTAR_PUNTOS.length + ' punto' + (_DICTAR_PUNTOS.length !== 1 ? 's' : '');
  if (btn) btn.disabled = _DICTAR_PUNTOS.length === 0;
  if (!lista) return;
  if (!_DICTAR_PUNTOS.length) {
    lista.innerHTML = '<div class=”dictar-empty”>Hab\xE1 y describe cada punto del recorrido. La IA arma la misi\xF3n autom\xE1ticamente.</div>';
    return;
  }
  var tecNombres = [USUARIOS.raul.nombre, USUARIOS.juan.nombre];
  var html = '';
  _DICTAR_PUNTOS.forEach(function(p, i) {
    var misionHtml = (p.mision || '').split('\n').filter(function(l) { return l.trim(); }).map(function(l) {
      return '<div class=”dictar-mision-linea”>' + esc(l) + '</div>';
    }).join('');
    var opts = tecNombres.map(function(t) {
      return '<option' + (t === p.tecnico ? ' selected' : '') + '>' + esc(t) + '</option>';
    }).join('');
    html += '<div class=”dictar-punto-card”>'
      + '<div class=”dictar-punto-num”>' + (i + 1) + '</div>'
      + '<div class=”dictar-punto-body”>'
      +   '<div class=”dictar-punto-nombre”>' + esc(p.nombre) + '</div>'
      +   (p.direccion ? '<div class=”dictar-punto-dir”>📍 ' + esc(p.direccion) + '</div>' : '')
      +   '<div class=”dictar-mision-wrap”>' + misionHtml + '</div>'
      +   (p.nota ? '<div class=”dictar-punto-nota”>📌 ' + esc(p.nota) + '</div>' : '')
      +   '<div class=”dictar-punto-footer”>'
      +     '<select class=”opts-select” onchange=”_dictarCambiarTecnico(' + i + ',this.value)” style=”font-size:0.8rem;padding:4px 6px”>' + opts + '</select>'
      +     (p.urgente ? '<span style=”color:#e53e3e;font-size:0.78rem;font-weight:700”>🔴 Urgente</span>' : '')
      +   '</div>'
      + '</div>'
      + '<button class=”dictar-punto-del” onclick=”_dictarEliminarPunto(' + i + ')” title=”Eliminar punto”>✕</button>'
      + '</div>';
  });
  lista.innerHTML = html;
}

function _dictarCambiarTecnico(idx, val) {
  if (_DICTAR_PUNTOS[idx]) _DICTAR_PUNTOS[idx].tecnico = val;
}

function _dictarEliminarPunto(idx) {
  _DICTAR_PUNTOS.splice(idx, 1);
  _renderDictarPuntos();
  _dictatStatus(_DICTAR_PUNTOS.length + ' punto(s). Pulsa micr\xF3fono para agregar m\xE1s.');
}

function hablarPuntoRecorrido() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { pfModal('No disponible', 'Tu navegador no soporta reconocimiento de voz. Usa Chrome.'); return; }
  var btn = document.getElementById('btn-mic-recorrido');
  if (_DICTAR_REC) {
    try { _DICTAR_REC.abort(); } catch(e) {}
    _DICTAR_REC = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4; Hablar punto'; }
    _dictatStatus('Grabaci\xF3n cancelada.');
    return;
  }
  if (btn) { btn.classList.add('grabando'); btn.innerHTML = '&#x23F9; Detener'; }
  _dictatStatus('🔴 Escuchando... habla ahora', '#c00');
  var rec = new SpeechRecognition();
  _DICTAR_REC = rec;
  rec.lang = 'es-EC';
  rec.continuous = false;
  rec.interimResults = false;
  rec.onresult = function(e) {
    var texto = e.results[0][0].transcript;
    _DICTAR_REC = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4; Hablar punto'; }
    _dictatStatus('⏳ Procesando: “' + texto + '”');
    _estructurarPuntoConIA(texto);
  };
  rec.onerror = function(ev) {
    _DICTAR_REC = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4; Hablar punto'; }
    _dictatStatus('⚠️ Error de micr\xF3fono: ' + ev.error, '#c00');
  };
  rec.onend = function() {
    _DICTAR_REC = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4; Hablar punto'; }
  };
  rec.start();
}

function _estructurarPuntoConIA(descripcion) {
  var num = _DICTAR_PUNTOS.length + 1;
  var tecDefault = USUARIOS.raul.nombre;
  // Detect if admin mentions the second technician by name
  var nombreJuan = USUARIOS.juan.nombre.toLowerCase().split(/\s+/)[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp('\\b' + nombreJuan + '\\b', 'i').test(descripcion)) tecDefault = USUARIOS.juan.nombre;

  var systemMsg = 'Eres un transcriptor de recorridos para PREVIFUEGO (empresa de extintores, Guayaquil, Ecuador).\n'
    + 'El admin Alejandro te describe UN punto de recorrido en voz. Tu \xFAnica tarea es plasmar EXACTAMENTE lo que dice en formato JSON.\n'
    + 'REGLA PRINCIPAL: NO agregues, NO inventes, NO asumas nada que el admin no haya dicho expl\xEDcitamente. Si no lo dijo, no va.\n'
    + 'FORMATO DE RESPUESTA (solo JSON, sin texto extra):\n'
    + '{“nombre”:”...”,”direccion”:”...”,”mision”:”...”,”nota”:”...”,”urgente”:false}\n\n'

    + '=== NOMBRES DE CLIENTES (solo para ortograf\xEDa correcta) ===\n'
    + 'KFC, Cebiches de la Rumi\xF1ahui, Menestras del Negro, Tortaman\xEDa, Papa Johns, Empanadas de Paco, '
    + 'Caj\xFAn Grill, American Deli, Il Capo, Juan Valdez, Baskin Robbins, No\xE9, Dolce Incontro, Casa Res, El Toro Asado, '
    + 'TropiBurger, Shiatsu, Yatai, Cinnabon, El Espa\xF1ol, Little Italy, Gus, HP Nutrition, Metroburger, Papizzec, Kobe, '
    + 'Carsague SA, Rychard Lorentzen, Segumar SCI, Importadora Federal, G\xF3mez y G\xF3mez, L\xF3pez y L\xF3pez, '
    + 'Servintex, SEPRO, Conseg, Panamito, Sumiseg, Oferservi SA, Mantex, Tecsind, Karmoseg, Ventas y Recargas Jurado, '
    + 'Congas, Produsol, Inmobiliaria Khoury, Korea Motors, Bidokan, Soselec, NovoCentro, Ikura, ICO Internacional, '
    + 'Layla Maksoud, Arafisa, Interhospital de los Ceibos, Garzota Chifa, Sandra Parrales, Ago SAS, Casares, '
    + 'Intriseg, Indutores, InduTorres, Dumilesa, Freddy Quezada, Producsol, La Esquina Peruana, Latitud 0, '
    + 'Innovasafe, T\xEDa Go, VESEIND Recargas, Tractocentro Ecuador, Almax, Oficinas Grupo T\xEDa, Oficinas Grupo KFC, '
    + 'Garaje (Sucre y Mal\xE9con), Pernos Lumitec, Regalo de Dios, Roberto Camacho, Demaco, Fujifilm, '
    + 'Joyeri\xEDa Marthita, Aeropuerto Gastroport, FEHIERRO, Aveiga, Obtida, Elinoc, Luis Tierra.\n'

    + '\n=== C\xD3MO COMPLETAR EL JSON ===\n'
    + '- nombre: nombre exacto del cliente con su ubicaci\xF3n, tal como lo menciona el admin. Capitalizar correctamente. '
    + 'Ejemplos: "KFC Shell Dur\xE1n", "Menestras del Negro Garzota", "Empanadas de Paco Terminal Terrestre".\n'
    + '- direccion: direcci\xF3n, sector o mall que el admin mencione expl\xEDcitamente. Si no lo dice, dejar "".\n'
    + '- mision: transcribir TEXTUALMENTE y en orden lo que el admin dice que hay que hacer, separando cada tarea por \\n. '
    + 'Si el admin menciona cantidades y tipos de extintor, incluirlos exactamente (ej: "Retirar 1 extintor CO\u2082 50lb y 3 PQS 10lb"). '
    + 'Si el admin menciona varios locales en un mismo punto, incluir todos con sus tareas. '
    + 'NO agregar, NO inventar, NO asumir nada que el admin no haya dicho.\n'
    + '- nota: solo lo que el admin diga como observaci\xF3n, advertencia o informaci\xF3n adicional. Si no dice nada, dejar "".\n'
    + '- urgente: true solo si el admin lo dice expl\xEDcitamente.\n'
    + 'IMPORTANTE: usa \\n para saltos de l\xEDnea. Responde SOLO con el JSON, sin texto adicional.';

  _llamarGroq([
    { role: 'system', content: systemMsg },
    { role: 'user', content: 'Descripci\xF3n del admin: “' + descripcion + '”' }
  ], 800, 0.1)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    // Extract JSON from response
    var jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Respuesta inesperada: ' + text.slice(0, 80));
    var parsed = JSON.parse(jsonMatch[0]);
    _DICTAR_PUNTOS.push({
      nombre:        parsed.nombre   || ('Punto ' + num),
      direccion:     parsed.direccion || '',
      mision:        parsed.mision   || 'Mantenimiento',
      nota:          parsed.nota     || '',
      urgente:       !!parsed.urgente,
      tecnico:       tecDefault,
      esKfc:         /\bkfc\b/i.test(parsed.nombre || ''),
      extintores:    0,
      local:         '',
      done:          false,
      enCamino:      false,
      horaCompletado: null,
      observacion:   ''
    });
    _renderDictarPuntos();
    _dictatStatus('✅ Punto ' + num + ' agregado. Pulsa para el siguiente.');
    // Scroll to bottom of list
    var lista = document.getElementById('dictar-puntos-lista');
    if (lista) lista.scrollTop = lista.scrollHeight;
  })
  .catch(function(err) {
    _dictatStatus('❌ Error: ' + String(err), '#c00');
  });
}

function publicarRecorridoDictado() {
  if (!_DICTAR_PUNTOS.length) { pfModal('Sin puntos', 'Dicta al menos un punto primero.'); return; }
  var manana = document.getElementById('dictar-chk-manana');
  var fechaPublicar = (manana && manana.checked) ? fechaMas(1) : fechaHoy();
  pfConfirm('Publicar recorrido', 'Se publicar\xE1n ' + _DICTAR_PUNTOS.length + ' punto(s) para el ' + fechaPublicar + '.\nLos t\xE9cnicos lo ver\xE1n en la app de inmediato.', function() {
    mostrarCargando(true);
    var puntos = _DICTAR_PUNTOS.map(function(p, i) {
      return Object.assign({}, p, { num: i + 1 });
    });
    dbxDownloadJSON(DBX_RECORRIDOS)
    .then(function(recorridos) {
      var existing = (recorridos[fechaPublicar] && recorridos[fechaPublicar].puntos) || [];
      puntos = puntos.map(function(p) {
        var prev = existing.filter(function(e) { return e.nombre === p.nombre; })[0];
        if (prev && prev.done) { p.done = true; p.horaCompletado = prev.horaCompletado; p.observacion = prev.observacion || ''; }
        else if (prev && prev.enCamino) { p.enCamino = true; }
        return p;
      });
      recorridos[fechaPublicar] = { fecha: fechaPublicar, publicado: new Date().toISOString(), puntos: puntos };
      return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
    })
    .then(function() {
      mostrarCargando(false);
      actualizarMemoriaValeria(puntos, 'Recorrido dictado por voz ' + fechaHoy());
      showToast('✅ Recorrido publicado — ' + puntos.length + ' puntos para ' + fechaPublicar);
      _DICTAR_PUNTOS = [];
      _renderDictarPuntos();
      _dictatStatus('Publicado. Puedes dictar un nuevo recorrido.');
      _initAdminRutaStatus();
    })
    .catch(function(err) { mostrarCargando(false); pfModal('Error', 'No se pudo publicar: ' + String(err)); });
  });
}

function limpiarPreview() {
  RUTA_PREVIEW = [];
  var wrap = document.getElementById('ruta-preview');
  if (wrap) wrap.style.display = 'none';
  _ultimaInstruccionVoz = '';
}

function compartirRutaWhatsApp() {
  if (!RUTA_PREVIEW.length) { showToast('No hay ruta para compartir'); return; }
  var texto = 'Recorrido Previfuego ' + fechaHoy() + ':\n';
  RUTA_PREVIEW.forEach(function(c, i) {
    var tecEl = document.getElementById('rtecnico-' + i);
    var tec = tecEl ? tecEl.value : '';
    texto += (i + 1) + '. ' + c.nombre + (c.direccion ? ' - ' + c.direccion : '') + (tec ? ' [' + tec + ']' : '') + '\n';
  });
  var url = 'https://wa.me/?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
}

function publicarRutaPreview() {
  if (!RUTA_PREVIEW.length) { pfModal('Sin ruta', 'Usa el micr\xF3fono o escribe para crear la ruta primero.'); return; }
  var mananaEl = document.getElementById('chk-manana');
  var fechaPublicar = (mananaEl && mananaEl.checked) ? fechaMas(1) : fechaHoy();
  var puntos = RUTA_PREVIEW.map(function(c, i) {
    var tecnicoEl  = document.getElementById('rtecnico-' + i);
    var notaEl     = document.getElementById('rnota-' + i);
    var priorityEl = document.getElementById('rpriority-' + i);
    return {
      nombre: c.nombre, direccion: c.direccion, extintores: c.extintores,
      local: c.local || '', esKfc: c.esKfc || false, mision: (c.tipos && c.tipos.length ? c.tipos.map(function(t){return t.tipo+(t.cap?' '+t.cap+'lbs':'');}).join(', ') : 'Mantenimiento'),
      tecnico: tecnicoEl ? tecnicoEl.value : USUARIOS.raul.nombre,
      nota: notaEl ? notaEl.value.trim() : '',
      urgente: priorityEl ? priorityEl.checked : false,
      done: false, enCamino: false, horaCompletado: null, observacion: ''
    };
  });
  pfConfirm('Publicar recorrido', 'Se publicar\xE1n ' + puntos.length + ' punto(s) para el ' + fechaPublicar + '. \xBFConfirmar?', function() {
    mostrarCargando(true);
    dbxDownloadJSON(DBX_RECORRIDOS)
    .then(function(recorridos) {
      var existing = recorridos[fechaPublicar];
      var existingPuntos = (existing && existing.puntos) ? existing.puntos : [];
      puntos = puntos.map(function(p) {
        var prev = existingPuntos.filter(function(e) { return e.nombre === p.nombre; })[0];
        if (prev && prev.done) { p.done = true; p.horaCompletado = prev.horaCompletado; p.observacion = prev.observacion || ''; }
        else if (prev && prev.enCamino) { p.enCamino = true; }
        return p;
      });
      recorridos[fechaPublicar] = { fecha: fechaPublicar, publicado: new Date().toISOString(), puntos: puntos };
      return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
    })
    .then(function() {
      mostrarCargando(false);
      actualizarMemoriaValeria(puntos, _ultimaInstruccionVoz);
      _resumenDiarioGroq(puntos);
      limpiarPreview();
      agregarBurbuja('valeria', '✅ Recorrido publicado para ' + fechaPublicar + ' con ' + puntos.length + ' punto(s). 🚀');
      _initAdminRutaStatus();
    })
    .catch(function(err) { mostrarCargando(false); pfModal('Error', 'No se pudo publicar: ' + String(err)); });
  });
}

/* ===================================================
   ADMIN — SEGUIMIENTO
=================================================== */
function _poblarFiltroTecnicos() {
  var sel = document.getElementById('seg-filtro-tecnico');
  if (!sel) return;
  var prev = sel.value;
  var nombres = [USUARIOS.raul.nombre, USUARIOS.juan.nombre];
  var html = '<option value="">Todos</option>';
  nombres.forEach(function(n) { html += '<option value="' + esc(n) + '">' + esc(n) + '</option>'; });
  sel.innerHTML = html;
  if (prev && nombres.indexOf(prev) !== -1) sel.value = prev;
}

function iniciarSeguimiento() {
  detenerSeguimiento();
  _poblarFiltroTecnicos();
  pfRenderSeguimiento();
  _seguimientoInterval = setInterval(pfRenderSeguimiento, _seguimientoIntervaloSeg * 1000);
}

function detenerSeguimiento() {
  if (_seguimientoInterval) { clearInterval(_seguimientoInterval); _seguimientoInterval = null; }
}

function cambiarIntervaloSeguimiento() {
  var el = document.getElementById('seg-intervalo');
  if (el) _seguimientoIntervaloSeg = parseInt(el.value) || 30;
  var nota = document.getElementById('auto-refresh-note');
  if (nota) nota.textContent = 'Se actualiza cada ' + _seguimientoIntervaloSeg + 's';
  if (_seguimientoInterval) { detenerSeguimiento(); iniciarSeguimiento(); }
}

function pfRenderSeguimiento() {
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    _segPuntosCache = hoy && hoy.puntos ? hoy.puntos : [];
    aplicarFiltroSeguimiento();
    var nota = document.querySelector('.auto-refresh-note');
    if (nota) {
      var ahora = new Date();
      nota.textContent = 'Actualizado: ' + String(ahora.getHours()).padStart(2,'0') + ':' + String(ahora.getMinutes()).padStart(2,'0') + ':' + String(ahora.getSeconds()).padStart(2,'0');
    }
  })
  .catch(function(err) {
    var nota = document.querySelector('.auto-refresh-note');
    if (nota) nota.textContent = '⚠️ Sin conexi\xF3n — reintentando...';
    console.error('[PF] seguimiento error:', err);
  });
}

function aplicarFiltroSeguimiento() {
  var filtroTec = document.getElementById('seg-filtro-tecnico');
  var tec = filtroTec ? filtroTec.value : '';
  var puntos = tec ? _segPuntosCache.filter(function(p) { return p.tecnico === tec; }) : _segPuntosCache.slice();
  filtrarSeguimiento(puntos);
}

function filtrarSeguimiento(puntosBase) {
  var buscar = document.getElementById('seg-buscar');
  var q = buscar ? buscar.value.trim().toLowerCase() : '';
  // When called from search input (no arg), respect active technician filter
  if (puntosBase === undefined) {
    var filtroTec = document.getElementById('seg-filtro-tecnico');
    var tec = filtroTec ? filtroTec.value : '';
    puntosBase = tec ? _segPuntosCache.filter(function(p) { return p.tecnico === tec; }) : _segPuntosCache.slice();
  }
  var puntos = puntosBase;
  if (q) {
    puntos = puntos.filter(function(p) {
      return (p.nombre || '').toLowerCase().indexOf(q) !== -1
        || (p.tecnico || '').toLowerCase().indexOf(q) !== -1;
    });
  }
  renderTablaSeguimiento(puntos);
}

function imprimirSeguimiento() {
  window.print();
}

function renderTablaSeguimiento(puntos) {
  var tbody    = document.getElementById('seg-tbody');
  var counters = document.getElementById('seg-counters');
  if (!tbody || !counters) return;
  if (!puntos || !puntos.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;padding:20px">Sin recorrido publicado hoy.</td></tr>';
    counters.innerHTML = '';
    return;
  }
  var tecnicos = {};
  puntos.forEach(function(p) {
    var t = p.tecnico || '—';
    if (!tecnicos[t]) tecnicos[t] = { done: 0, total: 0, enCamino: 0, ext: 0 };
    tecnicos[t].total++;
    if (p.done) tecnicos[t].done++;
    if (p.enCamino && !p.done) tecnicos[t].enCamino++;
    tecnicos[t].ext += (p.extintores || 0);
  });
  var cHtml = '';
  for (var tc in tecnicos) {
    if (!tecnicos.hasOwnProperty(tc)) continue;
    var s = tecnicos[tc];
    var colorBorder = tc === USUARIOS.raul.nombre ? '#3b82f6' : (tc === USUARIOS.juan.nombre ? '#f97316' : '#9e1212');
    var pct = s.total > 0 ? Math.round(s.done / s.total * 100) : 0;
    var circ = 2 * Math.PI * 18;
    var svgRing = '<svg width="44" height="44" style="position:absolute;top:8px;right:8px;flex-shrink:0"><circle cx="22" cy="22" r="18" fill="none" stroke="#eee" stroke-width="4"/><circle cx="22" cy="22" r="18" fill="none" stroke="' + colorBorder + '" stroke-width="4" stroke-dasharray="' + Math.round(circ) + '" stroke-dashoffset="' + Math.round(circ * (1 - pct / 100)) + '" stroke-linecap="round" transform="rotate(-90 22 22)"/><text x="22" y="27" text-anchor="middle" font-size="10" font-weight="bold" fill="' + colorBorder + '">' + pct + '%</text></svg>';
    cHtml += '<div class="seg-counter-card" style="border-left:4px solid ' + colorBorder + ';position:relative;padding-right:56px">'
      + '<div class="seg-counter-name">' + esc(tc) + '</div>'
      + '<div class="seg-counter-num">' + s.done + '</div>'
      + '<div class="seg-counter-total">de ' + s.total + (s.enCamino ? ' \xB7 🚗 ' + s.enCamino : '') + '</div>'
      + '<div style="font-size:0.72rem;color:#888;margin-top:2px">🛡️ ' + s.ext + ' ext.</div>'
      + svgRing
      + '</div>';
  }
  counters.innerHTML = cHtml;

  var sorted = puntos.slice().sort(function(a, b) {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.enCamino !== b.enCamino) return a.enCamino ? -1 : 1;
    return (a.nombre || '').localeCompare(b.nombre || '');
  });
  var tHtml = '';
  sorted.forEach(function(p) {
    var colorBorderRow = p.tecnico === USUARIOS.raul.nombre ? '3px solid #3b82f6' : (p.tecnico === USUARIOS.juan.nombre ? '3px solid #f97316' : 'none');
    var estadoBadge;
    if (p.done) {
      estadoBadge = '<span class="badge-done">✓ Listo</span>';
    } else if (p.enCamino) {
      estadoBadge = '<span class="badge-en-camino">🚗 En camino</span>';
    } else {
      estadoBadge = '<span class="badge-pending">Pendiente</span>';
    }
    var obsHtml = '—';
    if (p.observacion) {
      var claveObs = (p.nombre || '') + '|' + p.observacion;
      var badgeObs = _obsClasifCache[claveObs] ? '<div class="obs-clasif-badge">' + esc(_obsClasifCache[claveObs]) + '</div>' : '';
      obsHtml = '<div style="font-size:0.72rem;color:#666;font-style:italic">' + esc(p.observacion) + '</div>' + badgeObs;
      if (p.observacion.length > 20 && !(claveObs in _obsClasifCache)) {
        _obsClasifCache[claveObs] = '';
        clasificarObservacion(p.observacion).then(function(res) {
          if (res) { _obsClasifCache[claveObs] = res; aplicarFiltroSeguimiento(); }
        }).catch(function() {});
      }
    }
    tHtml += '<tr style="border-left:' + colorBorderRow + '">'
      + '<td>' + esc(p.nombre || '') + (p.esKfc ? ' <span class="badge-kfc-sm">KFC</span>' : '') + (p.urgente ? ' <span style="color:#e53e3e;font-weight:700">🔴</span>' : '') + (p.nota ? '<div style="font-size:0.7rem;color:#888">' + esc(p.nota) + '</div>' : '') + '</td>'
      + '<td><span class="tecnico-tag">' + esc(p.tecnico || '—') + '</span></td>'
      + '<td>' + estadoBadge + '</td>'
      + '<td>' + esc(p.horaCompletado || '—') + '</td>'
      + '<td>' + obsHtml + '</td>'
      + '</tr>';
  });
  tbody.innerHTML = tHtml;
}

/* ===================================================
   T\xC9CNICO
=================================================== */
function cargarRecorrido() {
  if (!USUARIO_ACTUAL || !USUARIOS[USUARIO_ACTUAL]) return;
  showScreen('s1');
  mostrarCargando(true);
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'none';
  var tecnico = USUARIOS[USUARIO_ACTUAL].nombre;
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    mostrarCargando(false);
    var hoy = recorridos[fechaHoy()];
    if (!hoy || !hoy.puntos || !hoy.puntos.length) { cargarRecorridoLocal(); return; }
    var misPuntos = hoy.puntos.filter(function(p) { return p.tecnico === tecnico; });
    if (!misPuntos.length) { mostrarVacio('No tienes puntos asignados para hoy.'); return; }
    localStorage.setItem('pf_puntos_' + fechaHoy(), JSON.stringify(misPuntos));
    procesarPuntos(misPuntos);
  })
  .catch(function() {
    mostrarCargando(false);
    var guardados = localStorage.getItem('pf_puntos_' + fechaHoy());
    if (guardados) {
      try {
        var arr = JSON.parse(guardados);
        var mis = arr.filter(function(p) { return !p.tecnico || p.tecnico === tecnico; });
        if (mis.length) { showToast('Sin conexi\xF3n — usando datos guardados'); procesarPuntos(mis); return; }
      } catch(e) {}
    }
    mostrarVacio('Sin conexi\xF3n con el servidor.\nVerifica tu internet e intenta de nuevo.');
  });
}

function cargarRecorridoLocal() {
  var guardados = localStorage.getItem('pf_puntos_' + fechaHoy());
  if (!guardados) { mostrarVacio(); return; }
  try {
    var arr = JSON.parse(guardados);
    var tecnico = USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '';
    var mis = arr.filter(function(p) { return !p.tecnico || p.tecnico === tecnico; });
    if (mis.length) procesarPuntos(mis); else mostrarVacio();
  } catch(e) { mostrarVacio(); }
}

function mostrarVacio(msg) {
  PUNTOS = [];
  var lista = document.getElementById('lista-puntos');
  if (lista) lista.innerHTML = '';
  var vacio = document.getElementById('s1-vacio');
  if (vacio) {
    vacio.style.display = 'flex';
    var p1 = vacio.querySelector('p:first-child');
    var p2 = vacio.querySelector('p:last-child');
    if (msg) { if (p1) p1.textContent = msg; if (p2) p2.textContent = ''; }
    else { if (p1) p1.textContent = 'No hay recorrido publicado para hoy.'; if (p2) p2.textContent = 'Consulta con Alejandro.'; }
  }
  actualizarProgreso();
}

function procesarPuntos(arr) {
  var estadoGuardado = {};
  try { var raw = localStorage.getItem('pf_estado_' + fechaHoy()); if (raw) estadoGuardado = JSON.parse(raw); } catch(e) {}
  PUNTOS = (Array.isArray(arr) ? arr : []).map(function(p, i) {
    // Compound key matches _guardarEstadoLocal; fall back to bare name for old format
    var clave = (p.nombre || '') + '\x00' + i;
    var e = estadoGuardado[clave] || estadoGuardado[p.nombre || i];
    return {
      num: i + 1, nombre: p.nombre || p.cliente || '', direccion: p.direccion || p.dir || '',
      mision: p.mision || 'Mantenimiento', tecnico: p.tecnico || '', esKfc: p.esKfc || false,
      urgente: p.urgente || false, nota: p.nota || '',
      done: e ? e.done : (p.done || false),
      enCamino: e ? (e.enCamino || false) : (p.enCamino || false),
      horaCompletado: e ? e.hora : (p.horaCompletado || null),
      observacion: e ? (e.observacion || '') : (p.observacion || '')
    };
  });
  // Clear undo state — array indices are now stale
  _undoIdx = null; _undoData = null;
  if (_undoTimer) { clearTimeout(_undoTimer); _undoTimer = null; }
  var undoBar = document.getElementById('undo-bar');
  if (undoBar) undoBar.classList.add('hidden');
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'none';
  renderPuntos();
  actualizarProgreso();
  _initSwipeGestures();
  _initPullToRefresh();
}

function renderPuntos() {
  var lista = document.getElementById('lista-puntos');
  if (!lista) return;
  var filtro = '';
  var buscar = document.getElementById('s1-buscar');
  if (buscar) filtro = buscar.value.trim().toLowerCase();
  var html = '';
  var count = 0;
  for (var i = 0; i < PUNTOS.length; i++) {
    var p = PUNTOS[i];
    if (filtro && p.nombre.toLowerCase().indexOf(filtro) === -1 && p.direccion.toLowerCase().indexOf(filtro) === -1) continue;
    count++;
    var kfcBadge = p.esKfc ? '<span class="badge-kfc-sm">KFC</span> ' : '';
    var urgBadge = p.urgente ? '<span style="color:#e53e3e;font-size:0.8rem;font-weight:700">🔴</span> ' : '';
    var notaHtml = p.nota ? '<div class="punto-card-nota">📌 ' + esc(p.nota) + '</div>' : '';
    var obsHtml  = (p.done && p.observacion) ? '<div class="punto-card-obs">📝 ' + esc(p.observacion) + '</div>' : '';

    var dirHtml = p.direccion
      ? '<a href="https://maps.google.com/?q=' + encodeURIComponent(p.direccion) + '" target="_blank" rel="noopener" class="punto-card-dir punto-card-dir-link">📍 ' + esc(p.direccion) + '</a>'
      : '';

    var hora = p.done && p.horaCompletado ? '<div class="punto-card-hora">&#10003; ' + esc(p.horaCompletado) + '</div>' : '';

    var accion;
    if (p.done) {
      accion = '<span class="btn-done-icon">&#10003;</span>';
    } else if (p.enCamino) {
      accion = '<div style="display:flex;flex-direction:column;gap:6px;align-items:center">'
        + '<span style="font-size:0.7rem;color:#f97316;font-weight:700">En camino</span>'
        + '<button class="btn-success" onclick="abrirMarcarListo(' + i + ')">&#10003; Listo</button>'
        + '</div>';
    } else {
      accion = '<div style="display:flex;flex-direction:column;gap:6px;align-items:center">'
        + '<button class="btn-en-camino" onclick="marcarEnCamino(' + i + ')" title="En camino">🚗</button>'
        + '<button class="btn-success" onclick="abrirMarcarListo(' + i + ')">&#10003; Listo</button>'
        + '</div>';
    }

    var estadoClass = p.done ? ' done' : (p.enCamino ? ' en-camino' : '');

    html += '<div class="punto-card' + estadoClass + '" id="punto-card-' + i + '" data-idx="' + i + '">'
      + '<div class="punto-card-num">' + (p.done ? '&#10003;' : (p.enCamino ? '🚗' : p.num)) + '</div>'
      + '<div class="punto-card-body">'
      +   '<div class="punto-card-nombre">' + urgBadge + kfcBadge + esc(p.nombre) + '</div>'
      +   dirHtml
      +   '<div class="punto-card-mision">' + (p.mision || '').split('\n').filter(function(l){return l.trim();}).map(function(l){return esc(l);}).join('<br>') + '</div>'
      +   notaHtml + hora + obsHtml
      + '</div>'
      + '<div class="punto-card-actions">' + accion + '</div>'
      + '</div>';
  }
  if (!count && filtro) html = '<div class="no-clientes">Sin resultados para "<strong>' + esc(filtro) + '</strong>"</div>';
  lista.innerHTML = html;
}

function _initSwipeGestures() {
  var lista = document.getElementById('lista-puntos');
  if (!lista) return;
  // Guard: only attach once to avoid duplicate listeners on every render/reload.
  if (lista._swipeInit) return;
  lista._swipeInit = true;
  var touchStartX = 0;
  var touchStartY = 0;
  lista.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  lista.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5 && dx > 0) {
      var el = e.target.closest('.punto-card');
      if (el) {
        var idx = parseInt(el.getAttribute('data-idx'));
        if (!isNaN(idx) && PUNTOS[idx] && !PUNTOS[idx].done) {
          abrirMarcarListo(idx);
        }
      }
    }
  }, { passive: true });
}

var _pullStartY = 0;
var _pulling = false;
function _initPullToRefresh() {
  var lista = document.getElementById('lista-puntos');
  if (!lista) return;
  // Guard: only attach once to avoid duplicate listeners on every render/reload.
  if (lista._pullInit) return;
  lista._pullInit = true;
  lista.addEventListener('touchstart', function(e) {
    if (lista.scrollTop === 0) { _pullStartY = e.touches[0].clientY; _pulling = true; }
  }, { passive: true });
  lista.addEventListener('touchend', function(e) {
    if (_pulling) {
      var dy = e.changedTouches[0].clientY - _pullStartY;
      if (dy > 80) { showToast('🔄 Actualizando...'); recargarRecorrido(); }
    }
    _pulling = false;
  }, { passive: true });
}

function filtrarPuntos() { renderPuntos(); }

function actualizarProgreso() {
  var total = PUNTOS.length;
  var done  = PUNTOS.filter(function(p) { return p.done; }).length;
  var texto = document.getElementById('prog-texto');
  var bar   = document.getElementById('prog-bar');
  if (texto) texto.textContent = done + '/' + total + ' completados';
  if (bar)   bar.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
}

function marcarEnCamino(idx) {
  if (idx < 0 || idx >= PUNTOS.length || PUNTOS[idx].done) return;
  PUNTOS[idx].enCamino = !PUNTOS[idx].enCamino;
  _guardarEstadoLocal();
  renderPuntos();
  if (navigator.vibrate) navigator.vibrate(40);
  showToast(PUNTOS[idx].enCamino ? '🚗 En camino a ' + PUNTOS[idx].nombre : PUNTOS[idx].nombre + ' — estado cancelado');
  subirFichas();
}

function abrirMarcarListo(idx) {
  var p = PUNTOS[idx];
  if (!p) return;
  var overlay = document.getElementById('modal-overlay');
  var titleEl2 = document.getElementById('modal-title');
  var msgEl2   = document.getElementById('modal-msg');
  var actEl    = document.getElementById('modal-actions');
  if (!overlay || !titleEl2 || !msgEl2 || !actEl) { marcarListo(idx, ''); return; }
  titleEl2.textContent = '✅ Completar: ' + p.nombre;
  msgEl2.innerHTML = '<div style="margin-bottom:10px;font-size:0.9rem;color:#555">Observaci\xF3n opcional:</div>'
    + '<textarea id="obs-input" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:10px;font-size:0.9rem;min-height:80px;resize:vertical;font-family:inherit" placeholder="\xBFAlguna observaci\xF3n?"></textarea>';
  actEl.innerHTML = '';
  var btnCancel = document.createElement('button');
  btnCancel.className = 'btn-ghost';
  btnCancel.textContent = 'Cancelar';
  btnCancel.onclick = function() { overlay.classList.add('hidden'); document.body.style.overflow = ''; };
  var btnOk = document.createElement('button');
  btnOk.className = 'btn-primary';
  btnOk.textContent = '✅ Marcar listo';
  btnOk.onclick = function() {
    var obs = document.getElementById('obs-input');
    var obsVal = obs ? obs.value.trim() : '';
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    marcarListo(idx, obsVal);
  };
  actEl.appendChild(btnCancel);
  actEl.appendChild(btnOk);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { var ta = document.getElementById('obs-input'); if (ta) ta.focus(); }, 100);
}

function marcarListo(idx, observacion) {
  if (idx < 0 || idx >= PUNTOS.length || PUNTOS[idx].done) return;
  var prevState = JSON.parse(JSON.stringify(PUNTOS[idx]));
  PUNTOS[idx].done = true;
  PUNTOS[idx].enCamino = false;
  var ahora = new Date();
  PUNTOS[idx].horaCompletado = String(ahora.getHours()).padStart(2,'0') + ':' + String(ahora.getMinutes()).padStart(2,'0');
  PUNTOS[idx].observacion = typeof observacion === 'string' ? observacion : '';
  _guardarEstadoLocal();
  renderPuntos();
  actualizarProgreso();
  if (navigator.vibrate) navigator.vibrate(80);

  _undoIdx = idx;
  _undoData = prevState;
  var undoBar = document.getElementById('undo-bar');
  var undoMsg = document.getElementById('undo-msg');
  if (undoBar && undoMsg) {
    undoMsg.textContent = '✓ ' + PUNTOS[idx].nombre + ' marcado como listo';
    undoBar.classList.remove('hidden');
    if (_undoTimer) clearTimeout(_undoTimer);
    _undoTimer = setTimeout(function() {
      undoBar.classList.add('hidden');
      _undoIdx = null;
      _undoData = null;
    }, 8000);
  }
  subirFichas();
}

function deshacerListo() {
  if (_undoIdx === null || !_undoData) return;
  // Re-locate by name in case array was rebuilt since undo was set
  var targetIdx = _undoIdx;
  if (!PUNTOS[targetIdx] || PUNTOS[targetIdx].nombre !== _undoData.nombre) {
    targetIdx = PUNTOS.findIndex(function(p) { return p.nombre === _undoData.nombre; });
    if (targetIdx === -1) { _undoIdx = null; _undoData = null; return; }
  }
  PUNTOS[targetIdx] = _undoData;
  _guardarEstadoLocal();
  renderPuntos();
  actualizarProgreso();
  var undoBar = document.getElementById('undo-bar');
  if (undoBar) undoBar.classList.add('hidden');
  if (_undoTimer) clearTimeout(_undoTimer);
  _undoIdx = null;
  _undoData = null;
  showToast('Acci\xF3n deshecha');
  subirFichas();
}

function _guardarEstadoLocal() {
  var estado = {};
  PUNTOS.forEach(function(p, i) {
    // Compound key: name + position handles duplicate client names in the same route
    var clave = (p.nombre || '') + '\x00' + i;
    estado[clave] = { done: p.done, hora: p.horaCompletado, enCamino: p.enCamino, observacion: p.observacion };
  });
  localStorage.setItem('pf_estado_' + fechaHoy(), JSON.stringify(estado));
}

function recargarRecorrido() { cargarRecorrido(); }

var _subirFichasTimer   = null;
var _subirFichasPending = false;
var _subirFichasReintentos = 0;

function subirFichas() {
  if (_subirFichasTimer) clearTimeout(_subirFichasTimer);
  _subirFichasReintentos = 0;
  _subirFichasTimer = setTimeout(function() { _ejecutarSubirFichas(); }, 800);
}

function _ejecutarSubirFichas() {
  if (_subirFichasPending) { subirFichas(); return; }  // Reschedule if upload still in flight
  _subirFichasPending = true;
  var tecnico  = USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '';
  var fechaSubir = fechaHoy();
  var snapshot = PUNTOS.map(function(p) {
    return { nombre: p.nombre, done: p.done, horaCompletado: p.horaCompletado, enCamino: p.enCamino || false, observacion: p.observacion || '' };
  });
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    var hoy = recorridos[fechaSubir];
    // dbxDownloadJSON returns {} for "file not found" — hoy absent = no route published yet, skip silently
    if (!hoy || !hoy.puntos) { var e = new Error('Sin recorrido hoy'); e.noRetry = true; throw e; }
    hoy.puntos = hoy.puntos.map(function(p) {
      if (p.tecnico !== tecnico) return p;
      var match = snapshot.filter(function(s) { return s.nombre === p.nombre; })[0];
      if (match) { p.done = match.done; p.horaCompletado = match.horaCompletado; p.enCamino = match.enCamino; p.observacion = match.observacion; }
      return p;
    });
    recorridos[fechaSubir] = hoy;
    return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
  })
  .then(function() { _subirFichasReintentos = 0; })
  .finally(function() { _subirFichasPending = false; })
  .catch(function(err) {
    if (err && err.noRetry) return; // "no route today" — silent skip, not an error
    console.error('[PF] subirFichas error:', err);
    _subirFichasReintentos++;
    if (_subirFichasReintentos <= 3) {
      showToast('⚠️ No se pudo sincronizar. Reintentando (' + _subirFichasReintentos + '/3)...');
      _subirFichasTimer = setTimeout(_ejecutarSubirFichas, 5000 * _subirFichasReintentos);
    } else {
      showToast('❌ Sin conexi\xF3n — tu avance qued\xF3 guardado en el tel\xE9fono. Pulsa ↻ cuando vuelva el internet.');
    }
  });
}

/* ===================================================
   INIT
=================================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Version footer (#98)
  var verEl = document.getElementById('cfg-version');
  if (verEl) verEl.textContent = APP_VERSION;

  // Pre-warm Dropbox token (#79)
  if (getRefreshToken()) { getValidToken().catch(function() {}); }

  // FAB scroll-to-top
  var tabClientes = document.getElementById('tab-clientes');
  if (tabClientes) {
    tabClientes.addEventListener('scroll', function() {
      var fab = document.getElementById('fab-top');
      if (fab) fab.classList.toggle('hidden', tabClientes.scrollTop < 200);
    });
  }

  // Clean up old per-day localStorage entries (older than 7 days)
  try {
    var ahora = Date.now();
    var siete = 7 * 24 * 60 * 60 * 1000;
    for (var li = localStorage.length - 1; li >= 0; li--) {
      var lk = localStorage.key(li);
      if (!lk) continue;
      if (lk.startsWith('pf_estado_') || lk.startsWith('pf_puntos_')) {
        // Key suffix is DD/MM/YYYY
        var partes = lk.split('_').slice(-1)[0].split('/');
        if (partes.length === 3) {
          var fechaEntry = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
          if (!isNaN(fechaEntry.getTime()) && ahora - fechaEntry.getTime() > siete) {
            localStorage.removeItem(lk);
          }
        }
      }
    }
  } catch(e) {}

  var oauthInProgress = handleOAuthCallback();
  if (!oauthInProgress) {
    var savedUser = localStorage.getItem('pf_usuario');
    if (savedUser && USUARIOS[savedUser]) login(savedUser);
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/previfuego-recorrido/sw.js').catch(function() {});
  }
  if (!navigator.onLine) {
    var b = document.getElementById('offline-banner');
    if (b) b.classList.remove('hidden');
  }
});

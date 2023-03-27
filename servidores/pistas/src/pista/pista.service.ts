import { Injectable } from '@nestjs/common';

import { Pista } from './pista';
import * as fs from 'fs';

@Injectable()
export class PistaService {
  private static readonly CANTIDAD_PISTAS = 10;
  private listaPistas: Pista[] = [];
  constructor() {
    this.loadPistas();
  }
  private loadPistas() {
    let archivo = fs.readFileSync('./src/pista/pistas.csv', 'utf8');
    let datos = archivo
      .split('\n')
      .map((p) => p.replace('\r', ''))
      .map((p) => p.split(','));
    this.listaPistas = [];
    for (let i = 0; i < datos.length; i++) {
      let pista = new Pista(
        parseInt(datos[i][0]),
        datos[i][1],
        parseInt(datos[i][2]),
        datos[i][3],
      );
      this.listaPistas.push(pista);
    }
  }
  public getPistas(): any {
    /* const listaPistas = [];
    for (let i = 0; i < PistaService.CANTIDAD_PISTAS; i++) {
      const pista = {
        identificador: i,
        titulo: `titulo ${i}`,
        duracion: Math.floor(Math.random() * 300),
        interprete: `interprete ${Math.floor(Math.random() * 3)}`,
      };
      listaPistas.push(pista);
    }
    return listaPistas;
  }*/
    return this.listaPistas;
  }

  public getPista(id: number): Pista {
    let resultado = this.listaPistas.find((pista) => pista.identificador == id);
    return resultado;
  }
  public addPista(pista: any): string {
    let nuevaPista = new Pista(
      pista.identificador,
      pista.titulo,
      pista.duracion,
      pista.interprete,
    );
    if (
      nuevaPista.identificador != null &&
      nuevaPista.titulo !== null &&
      nuevaPista.duracion != null &&
      nuevaPista.interprete != null
    ) {
      this.listaPistas.push(nuevaPista);
      this.saveToCsv(nuevaPista);
      return 'ok';
    } else {
      return 'parametro incorrecto';
    }
  }
  private saveToCsv(pista: Pista): void {
    fs.appendFileSync(
      './src/pista/pistas.csv',
      `${pista.identificador},${pista.titulo},${pista.duracion},${pista.interprete}\n`,
    );
  }
  public deletePista(posicion: number): string {
    let result = this.listaPistas.filter(
      (pista) => pista.identificador != posicion,
    );
    if (result.length != this.listaPistas.length) {
      this.listaPistas = result;
      this.rewritecsv();
      return 'ok';
    } else {
      return '404 not found';
    }
  }

  public rewritecsv() {
    fs.writeFile('./src/pista/pistas.csv', '', function () {
      console.log('CARLA');
    });

    this.listaPistas.forEach((pista) => {
      fs.appendFileSync(
        './src/pista/pistas.csv',
        `${pista.identificador},${pista.titulo},${pista.duracion},${pista.interprete}\n`,
      );
    });
  }
  public updatePista(id: number, pistaNueva: any): string {
    let pista = new Pista(
      pistaNueva.identificador,
      pistaNueva.titulo,
      pistaNueva.duracion,
      pistaNueva.interprete,
    );
    if (
      pista.identificador != null &&
      pista.titulo !== null &&
      pista.duracion != null &&
      pista.interprete != null
    ) {
      let index = this.listaPistas.findIndex(
        (pista) => pista.identificador == id,
      );
      if (index != -1) {
        this.listaPistas[index] = pista;
        return 'ok';
      } else {
        return '404';
      }
    } else {
      return 'parametros incorrectos';
    }
  }
}

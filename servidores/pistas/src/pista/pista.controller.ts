import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { PistaService } from './pista.service';
import { Pista } from './pista';
import { filter } from 'rxjs';
@Controller('pista')
export class PistaController {
  constructor(private readonly pistaService: PistaService) {}
  @Get()
  public getPistas(): string {
    return this.pistaService.getPistas();
  }
  @Get(':id')
  public getPista(@Param('id') id): Pista {
    return this.pistaService.getPista(parseInt(id));
  }
  @Post()
  create(@Body() pista: any): string {
    return this.pistaService.addPista(pista);
  }
  @Delete(':id')
  public deletePista(@Param('id') id: number): string {
    return this.pistaService.deletePista(id);
  }
  @Put(':id')
  public update(@Body() pista: any, @Param('id') id: number): string {
    return this.pistaService.updatePista(id, pista);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { VaccineCreateDTO } from '../dtos/create.vaccine.dto';
import { VaccineUpdateDTO } from '../dtos/update.vaccine.dto';
import { VaccineService } from '../services/vaccine.service';

@Controller('vaccines')
export class VaccineCreateController {
  public constructor(private service: VaccineService) {}

  @Get('')
  public async listVaccines() {
    try {
      return await this.service.listVaccines();
    } catch (err) {
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @Post('')
  public async createVaccine(@Body() vaccine: VaccineCreateDTO) {
    try {
      return await this.service.create(vaccine);
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @Put(':id')
  public async updateVaccine(
    @Param('id', ParseIntPipe) id: number,
    @Body() vaccine: VaccineUpdateDTO,
  ) {
    try {
      const updated = await this.service.update(id, vaccine);
      return { success: updated };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }

  @Delete(':id')
  public async deleteVaccine(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted = await this.service.delete(id);
      return { success: deleted };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException(
        'Error en el servidor, trate de nuevo luego',
      );
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //! Post
  @Post('new')
  @Auth(Role.admin, Role.root)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  //! Getters
  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':sky')
  @Auth()
  findOne(@Param('sku') sku: string) {
    return this.productsService.findOne(sku);
  }

  //! Update
  // TODO: terminar update and delete
  @Patch(':id')
  @Auth(Role.admin, Role.root)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  //! DELETE
  @Delete(':id')
  @Auth(Role.admin, Role.root)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

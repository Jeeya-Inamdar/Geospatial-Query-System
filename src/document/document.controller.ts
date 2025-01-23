import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post(':cityId')
  @ApiOperation({ summary: 'Create a new document within a city boundary' })
  @ApiResponse({
    status: 201,
    description: 'The document has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Param('cityId') cityId: string,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    try {
      return this.documentService.createWithinCityBoundary(
        cityId,
        createDocumentDto,
      );
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  @Get(':cityId')
  @ApiOperation({ summary: 'Get all documents within a city boundary' })
  @ApiResponse({
    status: 200,
    description: 'Return all documents within the city boundary.',
  })
  findAll(@Param('cityId') cityId: string) {
    return this.documentService.findWithinCityBoundary(cityId);
  }

  @Get(':cityId/:id')
  @ApiOperation({ summary: 'Get a document by ID within a city boundary' })
  @ApiResponse({ status: 200, description: 'Return the document.' })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  findOne(@Param('cityId') cityId: string, @Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Put(':cityId/:id')
  @ApiOperation({ summary: 'Update a document by ID within a city boundary' })
  @ApiResponse({
    status: 200,
    description: 'The document has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  update(
    @Param('cityId') cityId: string,
    @Param('id') id: string,
    @Body() updateDocumentDto: CreateDocumentDto,
  ) {
    return this.documentService.updateWithinCityBoundary(
      cityId,
      id,
      updateDocumentDto,
    );
  }

  @Delete(':cityId/:id')
  @ApiOperation({ summary: 'Delete a document by ID within a city boundary' })
  @ApiResponse({
    status: 200,
    description: 'The document has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  delete(@Param('cityId') cityId: string, @Param('id') id: string) {
    return this.documentService.deleteWithinCityBoundary(cityId, id);
  }
}

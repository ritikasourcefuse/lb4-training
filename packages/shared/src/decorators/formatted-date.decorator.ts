import {MetadataInspector, PropertyDecoratorFactory} from '@loopback/core';

export function FormattedDate(format: string = 'YYYY-MM-DD HH:mm:ss') {
  return PropertyDecoratorFactory.createDecorator<string>(
    'metadata.formattedDate',
    format,
  );
}

export function getFormattedDateMetadata(target: object, propertyName: string) {
  return MetadataInspector.getPropertyMetadata<string>(
    'metadata.formattedDate',
    target,
    propertyName,
  );
}

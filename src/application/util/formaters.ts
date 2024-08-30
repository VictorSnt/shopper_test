import { MeasureType } from '../../domain/enum/mesurementType';

export function formatMeasureType(value: string): MeasureType {
  const upperValue = value.toUpperCase();
  if (!Object.values(MeasureType).includes(upperValue as MeasureType)) {
    throw new Error(
      'MeasureType must be "WATER" or "GAS" lowercase or uppercase'
    )
  }
  return upperValue as MeasureType;
}


export function extractNumericContent(text: string): string {
  
  const firstDigitIndex = text.search(/\d/);
  const lastDigitIndex = text.search(/\d(?!.*\d)/);

  if (firstDigitIndex === -1 || lastDigitIndex === -1) {
    return '';
  }

  const substring = text.substring(firstDigitIndex, lastDigitIndex + 1);
  return substring.replace(/[^0-9.]/g, '');
}
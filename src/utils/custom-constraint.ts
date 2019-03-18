import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * @see https://github.com/typestack/class-validator/issues/145
 *
 * @export
 * @class IsLessThan
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'isLessThan', async: false })
export class IsLessThan implements ValidatorConstraintInterface {

  validate(propertyValue: number, args: ValidationArguments) {
    const otherValue = args.object[args.constraints[0]];
    // 第二个操作数不存在时，默认通过验证
    return otherValue ? propertyValue < args.object[args.constraints[0]] : true;
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be less than "${args.constraints[0]}"`;
  }
}

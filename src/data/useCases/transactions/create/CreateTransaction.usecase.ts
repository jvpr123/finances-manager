import { ICreateTransactionUseCase } from "src/domain/useCases/transactions/create/CreateTransaction.interface";
import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";

import { ValidationError } from "src/errors/Validation.error";

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: ICreateTransactionRepository
  ) {}

  async execute(input: ICreateTransactionInput): Promise<ITransactionModel> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    return await this.repository.create(data);
  }
}

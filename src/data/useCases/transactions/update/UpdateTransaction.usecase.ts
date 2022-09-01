import { IUpdateTransactionUseCase } from "src/domain/useCases/transactions/update/UpdateTransaction.interface";
import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { IUpdateTransactionRepository } from "src/data/protocols/database/transactions/UpdateTransactionRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IFindTransactionsRepository &
      IUpdateTransactionRepository
  ) {}

  async execute(input: IUpdateTransactionInput): Promise<ITransactionModel> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    const transactionToUpdate = await this.repository.findById(data.id);

    if (!transactionToUpdate)
      throw new NotFoundError(
        `Could not update: data related to ID provided not found`
      );

    return await this.repository.update(data);
  }
}

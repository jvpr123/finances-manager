import { ICreateTransactionUseCase } from "src/domain/useCases/transactions/create/CreateTransaction.interface";
import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly unitsRepository: IFindUnitsRepository,
    private readonly transactionsRepository: ICreateTransactionRepository
  ) {}

  async execute(input: ICreateTransactionInput): Promise<ITransactionModel> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    const { unitId, ...creationData } = data;
    const unit = await this.unitsRepository.findById(unitId);

    if (!unit)
      throw new NotFoundError(
        "Could not create: Unit data related to ID provided not found"
      );

    return await this.transactionsRepository.create({ unit, ...creationData });
  }
}

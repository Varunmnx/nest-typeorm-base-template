import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { BaseInterfaceRepository, HasId } from './entity.interface';
import { Pagination, PaginationResponse, RepoPagination } from '../models/common.models';

export abstract class BaseAbstractRepository<T extends HasId> implements BaseInterfaceRepository<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    try {
      return await this.entity.save(data);
    } catch (error) {
      console.error(`Error saving entity: ${error.message}`);
      throw error;
    }
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    try {
      return await this.entity.save(data);
    } catch (error) {
      console.error(`Error saving entities: ${error.message}`);
      throw error;
    }
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async findOneById(id: any): Promise<T | null> {
    try {
      const options: FindOneOptions<T> = {
        where: { id: id },
      };
      const result = await this.entity.findOne(options);

      if (!result) {
        return null;
      }

      return result;
    } catch (error) {
      console.error(`Error finding entity by ID: ${error.message}`);
      throw error;
    }
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    try {
      return await this.entity.findOne(filterCondition);
    } catch (error) {
      console.error(`Error finding entity by condition: ${error.message}`);
      throw error;
    }
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    try {
      return await this.entity.find(relations);
    } catch (error) {
      console.error(`Error finding entities with relations: ${error.message}`);
      throw error;
    }
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    try {
      return await this.entity.find(options);
    } catch (error) {
      console.error(`Error finding all entities: ${error.message}`);
      throw error;
    }
  }

  public async findWithPagination(entityFilterQuery: FindOptionsWhere<T>, pagination: Pagination): Promise<PaginationResponse<T[]>> {
    const repoPagination = RepoPagination.of(pagination);

    const [data, total] = await this.entity.findAndCount({
      where: entityFilterQuery,
      take: repoPagination.limit,
      skip: repoPagination.skip,
      order: repoPagination.sort,
    });

    const paginationResponse = PaginationResponse.builder()
      .setList<T>(data)
      .setCount(total)
      .setLimit(repoPagination.limit)
      .setPage(repoPagination.page)
      .build<T[]>();

    return paginationResponse;
  }

  public async remove(data: T | T[]): Promise<T | T[]> {
    try {
      if (Array.isArray(data)) {
        return await this.entity.remove(data);
      } else {
        return await this.entity.remove(data);
      }
    } catch (error) {
      console.error(`Error removing entity/entities: ${error.message}`);
      throw error;
    }
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    try {
      return await this.entity.preload(entityLike);
    } catch (error) {
      console.error(`Error preloading entity: ${error.message}`);
      throw error;
    }
  }
}

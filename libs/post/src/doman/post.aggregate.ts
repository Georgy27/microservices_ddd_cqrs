import { IPost } from '@lib/post/doman/post.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { PostServices } from '@lib/post/doman/services';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { DomainError } from '@lib/errors';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = randomStringGenerator();

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @Exclude()
  published = false;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
    // this.id = post.id;
    // this.authorId = post.authorId;
    // this.message = post.message;
    // this.published = post.published;
    // this.createdAt = post.createdAt;
    // this.updatedAt = post.updatedAt;
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();
    Object.assign(_post, post);
    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;

    const errors = validateSync(post, { whitelist: true });
    if (errors.length) {
      throw new DomainError(errors, 'Post not valid');
    }

    return _post;
  }
}

import { IPost } from '@lib/post/doman/post.interface';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AggregateRoot } from '@nestjs/cqrs';

export class PostAggregate extends AggregateRoot implements IPost {
  id: string = randomStringGenerator();
  authorId: string;
  message: string;
  published = false;
  title: string;
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();

  private constructor(post: Partial<IPost>) {
    super();
    this.id = post.id;
    this.authorId = post.authorId;
    this.message = post.message;
    this.published = post.published;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate(post);
    return _post;
  }
}

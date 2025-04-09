import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Post } from './blog.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByUser(userId: number) {
    return this.postsRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
    });
  }

  findOneById(id: number) {
    return this.postsRepository.find({
      where: {
        id,
      },
    })
  }

  async create(userId: number, createPostDto: Partial<Post>) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const newPost = this.postsRepository.create({ ...createPostDto, user });
    return this.postsRepository.save(newPost);
  }

  async findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['user'], // Include user details in response
    });
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }



  async findOneByKeywords(searchString: string) {
    return this.postsRepository.find({
      where: [
        { title: Like(`%${searchString}%`) },
        { body: Like(`%${searchString}%`) },
      ],
    });
  }


  async update(userId: number, id: number, updatePostDto: Partial<Post>) {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['user'] });

    if (!post) {
      throw new ForbiddenException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not the owner of this post');
    }

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(userId: number, id: number) {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['user'] });

    if (!post) {
      throw new ForbiddenException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not the owner of this post');
    }

    return this.postsRepository.remove(post);
  }
}

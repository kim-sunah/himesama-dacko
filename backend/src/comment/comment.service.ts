import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns-tz';

@Injectable()
export class CommentService {

  constructor(@InjectRepository(Comment) private readonly commentRepository : Repository<Comment>){}
 
  async createcomment(createCommentDto: CreateCommentDto) {
    const createAt = format(Date.now(), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Seoul' });
    return await this.commentRepository.save({comment : createCommentDto.comment , createAt :createAt});
  }

  async findAllcomment() {
    return await this.commentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

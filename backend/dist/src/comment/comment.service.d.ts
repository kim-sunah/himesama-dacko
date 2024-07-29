import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
export declare class CommentService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    createcomment(createCommentDto: CreateCommentDto): Promise<{
        comment: string;
        createAt: string;
    } & Comment>;
    findAllcomment(): Promise<Comment[]>;
    findOne(id: number): string;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}

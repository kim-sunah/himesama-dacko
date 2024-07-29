import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createcomment(createCommentDto: CreateCommentDto): Promise<{
        comment: string;
        createAt: string;
    } & import("./entities/comment.entity").Comment>;
    findAllcomment(): Promise<import("./entities/comment.entity").Comment[]>;
    findOne(id: string): string;
    update(id: string, updateCommentDto: UpdateCommentDto): string;
    remove(id: string): string;
}

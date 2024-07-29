import { CreateVideoDto } from './dto/create-video.dto';
import { videoview } from './entities/videoview.entity';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { videocomment } from './entities/videocomment.entity';
import { videolike } from './entities/videolike.entity';
export declare class VideoService {
    private readonly videoviewRepository;
    private readonly videocommentRepository;
    private readonly videolikeRepository;
    private readonly VideoRepository;
    constructor(videoviewRepository: Repository<videoview>, videocommentRepository: Repository<videocomment>, videolikeRepository: Repository<videolike>, VideoRepository: Repository<Video>);
    create(createVideoDto: CreateVideoDto): string;
}

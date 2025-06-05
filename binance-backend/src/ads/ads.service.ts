import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ad } from "./entities/ad.entity";
import { CreateAdDto } from "./dto/create-ad.dto";
import { Currency } from "../currencies/entities/currency.entity";
import { User } from "../users/entities/user.entity";
import * as fs from "fs";
import { join } from "path";

@Injectable()
export class AdsService {
    constructor(
        @InjectRepository(Ad)
        private readonly adRepository: Repository<Ad>,

        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Crear anuncio
    async createAd(dto: CreateAdDto, imagePath: string | null, userId: number): Promise<Ad> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const currency = await this.currencyRepository.findOne({ where: { id: dto.currencyId } });

            if (!user || !currency) {
                this.deleteImageIfExists(imagePath); // 👈 Elimina si hay error
                throw new NotFoundException("Usuario o moneda no encontrada");
            }

            const ad = this.adRepository.create({
                ...dto,
                paymentImage: imagePath ?? undefined,
                user,
                currency,
            });

            return await this.adRepository.save(ad);
        } catch (error) {
            this.deleteImageIfExists(imagePath); // 👈 Elimina si falla algo
            throw error;
        }
    }

    private deleteImageIfExists(imagePath: string | null) {
        if (!imagePath) return;

        const fullPath = join(__dirname, "..", "..", "public", imagePath.replace("/uploads", "uploads"));

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }

    // Obtener anuncios filtrados
    async getAdsFiltered(type?: "BUY" | "SELL", currencyId?: number): Promise<Ad[]> {
        const query = this.adRepository.createQueryBuilder("ad").leftJoinAndSelect("ad.currency", "currency").leftJoinAndSelect("ad.user", "user");

        if (type) query.andWhere("ad.type = :type", { type });
        if (currencyId) query.andWhere("currency.id = :currencyId", { currencyId });

        return query.orderBy("ad.createdAt", "DESC").getMany();
    }

    // Obtener anuncio por ID
    async getAdById(id: number): Promise<Ad> {
        const ad = await this.adRepository.findOne({
            where: { id },
            relations: ["currency", "user"],
        });

        if (!ad) {
            throw new NotFoundException("Anuncio no encontrado");
        }

        return ad;
    }
}

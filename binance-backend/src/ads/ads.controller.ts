import { Controller, Post, Get, Param, Query, Body, Req, UseGuards, UploadedFile, UseInterceptors, ParseIntPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdsService } from "./ads.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("ads")
export class AdsController {
    constructor(private readonly adsService: AdsService) {}

    // Crear anuncio - solo usuarios con rol "user"
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("user")
    @Post("create")
    @UseInterceptors(FileInterceptor("paymentImage"))
    async createAd(@Body() dto: CreateAdDto, @UploadedFile() file: Express.Multer.File, @Req() req: { user: { id: number } }) {
        const imagePath = file ? `/uploads/${file.filename}` : null;
        return this.adsService.createAd(dto, imagePath, Number(req.user.id));
    }

    // Obtener anuncios filtrados (ej: /ads?type=BUY&currencyId=2)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAds(@Query("type") type?: "BUY" | "SELL", @Query("currencyId", ParseIntPipe) currencyId?: number) {
        return this.adsService.getAdsFiltered(type, currencyId);
    }

    // Obtener anuncio por ID
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getAdById(@Param("id", ParseIntPipe) id: number) {
        return this.adsService.getAdById(id);
    }
}

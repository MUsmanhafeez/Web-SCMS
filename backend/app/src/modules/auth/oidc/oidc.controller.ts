import { All, Controller, Req, Res, Get } from '@nestjs/common'
import { OidcService } from './oidc.service'
import { Request, Response } from 'express'
import { OidcInteraction } from './utils/type'
import { OIDC_SUBPATH } from 'src/config'

@Controller(OIDC_SUBPATH)
export class OidcController {
  constructor(private readonly oidcService: OidcService) {}

  @Get(`/interaction/:uid/confirm`)
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const oidcInteraction: OidcInteraction = await this.oidcService.oidc.interactionDetails(
      req,
      res
    )
    const result = await this.oidcService.setInteractionGrant(oidcInteraction)
    await this.oidcService.oidc.interactionFinished(req, res, result, {
      mergeWithLastSubmission: true
    })
  }

  @All(`/*`)
  public async rewriteToProvider(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    req.url = req.originalUrl.replace(`/${OIDC_SUBPATH}`, ``)
    return this.oidcService.oidcCallback(req, res)
  }
}

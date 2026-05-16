import { asyncHandler } from "../../common/utils/async-handler";
import { AuthenticatedRequest } from "../auth/types/authenticated-request";
import { UsersService } from "./users.service";

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  me = asyncHandler(async (req, res) => {
    const authRequest = req as AuthenticatedRequest;
    const user = await this.usersService.findByIdOrThrow(authRequest.user.id);

    res.status(200).json({
      user: this.usersService.toResponse(user),
    });
  });
}

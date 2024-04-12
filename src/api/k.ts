import service from '../utils/request.js';
import qs from "qs";

export function tokenPrices(params = {}) {
    return service({
        url: `/api/v1/token/token_prices`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        params,
    });
}

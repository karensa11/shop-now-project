import {formatPrice} from "../../../util/formatter";

export default function Price({price}) {
    const formattedPrice = formatPrice(price);
    return (
        <span>{formattedPrice}</span>
    )
}

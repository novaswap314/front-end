export function formatNumber(number) {
    // 将数字转换为字符串
    const str = String(number);

    // 如果字符串包含小数点
    if (str.includes('.')) {
        const [integerPart, decimalPart] = str.split('.');

        // 处理整数部分
        let formattedInteger = integerPart;

        // 处理小数部分
        let formattedDecimal = '';
        if (decimalPart) {
            if (decimalPart.match(/^0+/)) {
                // 获取小数部分中连续的零的数量
                const zeroCount = decimalPart.match(/^0+/)[0].length;
                formattedDecimal = `.0{${zeroCount}}${decimalPart.slice(zeroCount, zeroCount+4)}`;
            } else {
                if (decimalPart.indexOf('e') > 0) {
                    formattedDecimal = `.${decimalPart.replace(/^(\d{4})\d*(e-[0-9]+)$/, "$1$2")}`;
                } else {
                    formattedDecimal = `.${decimalPart.slice(0, 4)}`;
                }
            }
        }

        return `${formattedInteger}${formattedDecimal}`;
    }

    return str; // 如果没有小数点，直接返回原字符串
}
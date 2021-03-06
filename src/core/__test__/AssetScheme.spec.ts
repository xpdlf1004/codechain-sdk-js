import { AssetScheme } from "../AssetScheme";
import { U64 } from "../U64";

test("toJSON", () => {
    const assetScheme = new AssetScheme({
        metadata: "abcd",
        amount: new U64(111),
        approver: null,
        administrator: null,
        pool: []
    });
    expect(AssetScheme.fromJSON(assetScheme.toJSON())).toEqual(assetScheme);
});

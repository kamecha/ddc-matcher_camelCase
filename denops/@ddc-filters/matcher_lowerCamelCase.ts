import {
	BaseFilter,
	Item,
	SourceOptions,
} from "https://deno.land/x/ddc_vim@v3.2.0/types.ts";

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
	override filter(args: {
		filterParams: Params,
		completeStr: string,
		items: Item[],
	}): Promise<Item[]> {
		let beginningOfWord = (word: string) => {
			if (word.length == 0) {
				return "";
			}
			let result = word[0];
			for (let i = 1; i < word.length; i++) {
				if (word[i].toUpperCase() == word[i]) {
					result += word[i];
				}
			}
			return result;
		}
		return Promise.resolve(args.items.filter((item) => {
			let word = beginningOfWord(item.word);
			return word.toLowerCase().startsWith(args.completeStr);
		}
	}

	override params(): Params {
		return {
		};
	}
}

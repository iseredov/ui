import {
  ILoadOptionParams,
  ILoadOptionsData,
} from '../hooks/useSearchLoadData';

export const selectSize = {
  sm: 'sm',
  nm: 'nm',
  lg: 'lg',
};

export interface IOption {
  id: IdType;
  name: string;
}

export const defaultOptionList = ([
  { id: 1, name: 'Маленькая опция' },
  { id: 2, name: 'Опция чуть большей длины' },
  {
    id: 3,
    name:
      'Супер мега длинная опция, чтобы проверить корректность её отображения',
  },
  { id: 4, name: 'Опция тест_1' },
  { id: 5, name: 'Скромная опция' },
  { id: 8, name: 'Опция тест_2' },
] as any) as IOption[];

const isOptionFound = (searchValue: string, { name }: IOption) =>
  (name || '').toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;

export const mockLoadOptions = (optionList: IOption[] = defaultOptionList) => ({
  search,
  perPage,
  page,
}: ILoadOptionParams): Promise<ILoadOptionsData<IOption>> =>
  new Promise(res =>
    setTimeout(() => {
      const fromOptionIndex = perPage * (page - 1);
      const options: IOption[] = optionList
        .filter(isOptionFound.bind(null, search))
        .slice(fromOptionIndex, fromOptionIndex + perPage);

      const total = optionList.length;
      const amountPages = Math.round(optionList.length / perPage);

      const isNext = amountPages > page;

      const result: ILoadOptionsData<IOption> = {
        options,
        total,
        page,
        isNext,
      };

      res(result);
    }, 1000)
  );

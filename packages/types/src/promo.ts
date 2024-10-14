import { Avail } from "./availability";
import { BaseData, NamedData } from "./base";
import { IDrinkFlavor } from "./drink";
import { IOrderPaymentType } from "./order";
import { IOtherSize, IOtherVariation } from "./other";
import { PercentOrValue } from "./percent";
import {
  IPizzaCrust,
  IPizzaDoughThickness,
  IPizzaDoughType,
  IPizzaFlavor,
  IPizzaSize,
} from "./pizza";

interface IPromoActionBase extends BaseData {}

interface PriceChangePizzaSize extends IPromoActionBase {
  type: "priceChangePizzaSize";
  sizeId: string;
}
interface PriceChangeDrink extends IPromoActionBase {
  type: "priceChangeDrink";
  drinkId: string;
}
interface PriceChangeOther extends IPromoActionBase {
  type: "priceChangeOther";
  otherId: string;
}
interface DeliveryFeeDiscount extends IPromoActionBase {
  type: "deliveryFeeDiscount";
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PizzaCrustDiscount extends IPromoActionBase {
  type: "pizzaCrustDiscount";
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PizzaExtrasDiscount extends IPromoActionBase {
  type: "pizzaExtrasDiscount";
  extrasId: string[];
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PizzaDoughtThicknessDiscount extends IPromoActionBase {
  type: "pizzaDoughtThicknessDiscount";
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PizzaDoughtTypeDiscount extends IPromoActionBase {
  type: "pizzaDoughtTypeDiscount";
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PromoDiscount extends IPromoActionBase {
  type: "promoDiscount";
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PromoItemsGroupDiscount extends IPromoActionBase {
  type: "promoItemsGroupDiscount";
  itemsGroupId: string;
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface PromoItemDiscount extends IPromoActionBase {
  type: "promoItemDiscount";
  itemId: string;
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface OtherExtrasDiscount extends IPromoActionBase {
  type: "otherExtrasDiscount";
  extrasId: string[];
  discount: PercentOrValue;
  maxDiscount?: number;
}
interface DeliveryFeeFixedValue extends IPromoActionBase {
  type: "deliveryFeeFixedValue";
  fixedvalue: number;
}
interface PizzaCrustFixedValue extends IPromoActionBase {
  type: "pizzaCrustFixedValue";
  fixedvalue: number;
}
interface PizzaExtrasFixedValue extends IPromoActionBase {
  type: "pizzaExtrasFixedValue";
  extrasId: string[];
  fixedvalue: number;
}
interface PizzaDoughtThicknessFixedValue extends IPromoActionBase {
  type: "pizzaDoughtThicknessFixedValue";
  fixedvalue: number;
}
interface PizzaDoughtTypeFixedValue extends IPromoActionBase {
  type: "pizzaDoughtTypeFixedValue";
  fixedvalue: number;
}
interface PromoFixedValue extends IPromoActionBase {
  type: "promoFixedValue";
  fixedvalue: number;
}
interface PromoItemFixedValue extends IPromoActionBase {
  type: "promoItemFixedValue";
  itemId: string;
  fixedvalue: number;
}
interface OtherExtrasFixedValue extends IPromoActionBase {
  type: "otherExtrasFixedValue";
  extrasId: string[];
  fixedvalue: number;
}

export type IPromoAction =
  | PriceChangePizzaSize
  | PriceChangeDrink
  | PriceChangeOther
  | DeliveryFeeDiscount
  | PizzaCrustDiscount
  | PizzaDoughtTypeDiscount
  | PizzaDoughtThicknessDiscount
  | PizzaExtrasDiscount
  | OtherExtrasDiscount
  | PromoDiscount
  | PromoItemDiscount
  | PromoItemsGroupDiscount
  | DeliveryFeeFixedValue
  | PizzaCrustFixedValue
  | PizzaDoughtTypeFixedValue
  | PizzaDoughtThicknessFixedValue
  | PizzaExtrasFixedValue
  | OtherExtrasFixedValue
  | PromoFixedValue
  | PromoItemFixedValue;

interface IPromoRuleBase extends BaseData {
  fullName?: string;
}

interface PromoItemMinValue extends IPromoRuleBase {
  type: "promoItemMinValue";
  itemId: string;
  value: number;
}
interface PromoItemMaxValue extends IPromoRuleBase {
  type: "promoItemMinValue";
  itemId: string;
  value: number;
}
// interface SpacificDaysOfWeek extends IPromoRuleBase {
//   type: "specificDaysOfWeek";
//   value: DayOfWeek[];
// }
interface SpecificPaymentTypes extends IPromoRuleBase {
  type: "specificPaymentTypes";
  value: IOrderPaymentType[];
  anotherPaymentTypeFee: PercentOrValue;
}
// interface SpecificDates extends IPromoRuleBase {
//   type: "specificDates";
//   value: Date[];
// }
// interface SpecificPeriods extends IPromoRuleBase {
//   type: "specificDates";
//   value: Period[];
// }
interface PizzaSpecificDoughTypes extends IPromoRuleBase {
  type: "pizzaSpecificDoughTypes";
  value: IPizzaDoughType[];
}
interface PizzaSpecificDoughThicknesses extends IPromoRuleBase {
  type: "pizzaSpecificDoughThicknesses";
  value: IPizzaDoughThickness[];
}
interface PizzaSpecificCrusts extends IPromoRuleBase {
  type: "pizzaSpecificCrusts";
  value: IPizzaCrust[];
}
interface CustomerMinSpentValue extends IPromoRuleBase {
  type: "customerMinSpentValue";
  value: number;
}
interface CustomerMinOrders extends IPromoRuleBase {
  type: "customerMinOrders";
  value: number;
}
interface CustomerMaxOrders extends IPromoRuleBase {
  type: "customerMaxOrders";
  value: number;
}
interface CustomerForEverySpentValue extends IPromoRuleBase {
  type: "customerForEverySpentValue";
  value: number;
}
interface TodayMaxOrders extends IPromoRuleBase {
  type: "todayMaxOrders";
  value: number;
}
interface TodayMaxOrdersWithLastOnePizzaSize extends IPromoRuleBase {
  type: "todayMaxOrdersWithLastOnePizzaSize";
  sizesId: string[];
  value: number;
}
interface TodayMaxPizzaSizes extends IPromoRuleBase {
  type: "todayMaxPizzaSizes";
  sizesId: string[];
  value: number;
}
interface TodayMinPizzaSizes extends IPromoRuleBase {
  type: "todayMinPizzaSizes";
  sizesId: string[];
  value: number;
}
interface TodayMinOrders extends IPromoRuleBase {
  type: "todayMinOrders";
  value: number;
}
interface TodayMaxOrdersSpentValue extends IPromoRuleBase {
  type: "todayMaxOrders";
  value: number;
}
interface TodayMinOrdersSpentValue extends IPromoRuleBase {
  type: "todayMinOrders";
  value: number;
}
interface PromoMinSpentValue extends IPromoRuleBase {
  type: "promoMinSpentValue";
  value: number;
}
interface PromoMaxSpentValue extends IPromoRuleBase {
  type: "promoMaxSpentValue";
  value: number;
}
interface OrderMinSpentValue extends IPromoRuleBase {
  type: "orderMinSpentValue";
  value: number;
}
interface OrderMaxSpentValue extends IPromoRuleBase {
  type: "orderMaxSpentValue";
  value: number;
}
interface OrderMinItemsBought extends IPromoRuleBase {
  type: "orderMinItemsBought";
  itemsId?: string[];
  value: number;
}
interface OrderMinPizzaSizes extends IPromoRuleBase {
  type: "orderMinPizzaSizes";
  sizesId?: string[];
  value: number;
}
interface OrderMaxItemsBought extends IPromoRuleBase {
  type: "orderMaxItemsBought";
  itemsId?: string[];
  value: number;
}
interface DeliveryMinFee extends IPromoRuleBase {
  type: "deliveryMinFee";
  value: number;
}
interface DeliveryMaxFee extends IPromoRuleBase {
  type: "deliveryMaxFee";
  value: number;
}
interface CustomerMinPizzaSizesBought extends IPromoRuleBase {
  type: "customerMinPizzaSizesBought";
  sizesId: string[];
  value: number;
}
interface CustomerMinDrinksBought extends IPromoRuleBase {
  type: "customerMinDrinksBought";
  drinkId: string;
  value: number;
}
interface CustomerMinOthersBought extends IPromoRuleBase {
  type: "customerMinOthersBought";
  othersId: string;
  value: number;
}
interface Coupon extends IPromoRuleBase {
  type: "coupon";
  value: string;
}

export type IPromoRule =
  //   | SpacificDaysOfWeek
  //   | SpecificDates
  //   | SpecificPeriods
  | SpecificPaymentTypes
  | CustomerMinSpentValue
  | CustomerMinOrders
  | CustomerMaxOrders
  | CustomerForEverySpentValue
  | TodayMaxOrders
  | TodayMinOrders
  | TodayMaxOrdersSpentValue
  | TodayMinOrdersSpentValue
  | TodayMaxOrdersWithLastOnePizzaSize
  | TodayMaxPizzaSizes
  | TodayMinPizzaSizes
  | PromoMinSpentValue
  | PromoMaxSpentValue
  | OrderMinSpentValue
  | OrderMaxSpentValue
  | OrderMinItemsBought
  | OrderMaxItemsBought
  | OrderMinPizzaSizes
  | DeliveryMinFee
  | DeliveryMaxFee
  | CustomerMinPizzaSizesBought
  | CustomerMinDrinksBought
  | CustomerMinOthersBought
  | PizzaSpecificDoughTypes
  | PizzaSpecificDoughThicknesses
  | PizzaSpecificCrusts
  | PromoItemMinValue
  | PromoItemMaxValue
  | Coupon;

export interface IPromo extends NamedData {
  itemsGroups?: IPromoItemsGroup[];
  actions: IPromoAction[];
  rules: IPromoRule[];
  isAutomatic: boolean;
  stock?: number;
  sold: number;
  avails: Avail[];
}

interface IPromoItemsGroupBase extends BaseData {
  items: IPromoItem[];
  selectionMethod: "every" | "add" | "or";
}
interface IPromoItemsGroupEvery extends IPromoItemsGroupBase {
  selectionMethod: "every";
}
interface IPromoItemsGroupOr extends IPromoItemsGroupBase {
  selectionMethod: "or";
}
interface IPromoItemsGroupAdd extends IPromoItemsGroupBase {
  selectionMethod: "add";
  minItems: number;
  maxItems: number;
}
type IPromoItemsGroup =
  | IPromoItemsGroupAdd
  | IPromoItemsGroupOr
  | IPromoItemsGroupEvery;

interface IPromoItemBase extends BaseData {}

export type IPromoItem = IPromoItemBase &
  (
    | {
        type: "pizza";
        sizes?: IPizzaSize[] | { sameAs: string[] };
        flavors?: IPizzaFlavor[];
        crusts?: IPizzaCrust[];
        doughTypes?: IPizzaDoughType[];
        doughThicknesses?: IPizzaDoughThickness[];
      }
    | {
        type: "drink";
        drinkId: string;
        flavors?: IDrinkFlavor[];
        originalValue?: number;
      }
    | {
        type: "other";
        otherId: string;
        sizes: IOtherSize[];
        variations: IOtherVariation[];
        originalValue?: number;
      }
  );

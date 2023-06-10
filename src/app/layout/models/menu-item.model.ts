export interface MenuItem {
  text: string;
  routerLink: string;
  isDisabled: boolean;
  isSelected: boolean;
  isMatchRouter: boolean;
  isMatchRouterExact: boolean;
}

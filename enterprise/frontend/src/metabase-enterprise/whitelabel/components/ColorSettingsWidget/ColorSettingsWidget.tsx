import React, { useCallback, useMemo, useRef } from "react";
import { debounce } from "lodash";
import { originalColors } from "../../lib/whitelabel";
import ColorSettings from "../ColorSettings";
import { ColorSetting } from "./types";

export interface ColorSettingsWidget {
  setting: ColorSetting;
  onChange: (value: Record<string, string>) => void;
}

const ColorSettingsWidget = ({
  setting,
  onChange,
}: ColorSettingsWidget): JSX.Element => {
  const onChangeDebounced = useDebounce(onChange, 400);

  return (
    <ColorSettings
      initialColors={setting.value}
      originalColors={originalColors}
      onChange={onChangeDebounced}
    />
  );
};

const useDebounce = function<T>(func: (value: T) => void, wait: number) {
  const ref = useRef(func);
  ref.current = func;

  const callback = useCallback((value: T) => {
    return ref.current?.(value);
  }, []);

  return useMemo(() => {
    return debounce(callback, wait);
  }, [callback, wait]);
};

export default ColorSettingsWidget;
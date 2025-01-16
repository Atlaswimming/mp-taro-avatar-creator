import React, { useCallback } from "react";
import { View, Text, Button, Image, Input } from "@tarojs/components";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  return (
    <View className="flex items-center gap-2">
      <View className="text-sm font-medium text-gray-700">{label}</View>
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
      />
    </View>
  );
};

import { SketchPicker } from "react-color";
import { useState } from "react";

const ColorPicker = () => {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const [showPicker, setShowPicker] = useState(false); // toggle state

  const { r, g, b, a } = sketchPickerColor;

  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div className="sketchpicker">

        {/* Color Preview */}
        <div
          onClick={() => setShowPicker(!showPicker)}
          style={{
            backgroundColor: `rgba(${r},${g},${b},${a})`,
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: "2px solid white",
          }}
        ></div>

        {/* Toggle Button */}
        {/* <button
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => setShowPicker(!showPicker)}
        >
          {showPicker ? "Hide Picker" : "Show Picker"}
        </button> */}

        {/* Conditional Render */}
        {showPicker && (
          <SketchPicker
            onChange={(color) =>{ setSketchPickerColor(color.rgb)}}
            color={sketchPickerColor}
          />
        )}
      </div>
    </div>
  );
};

export default ColorPicker;

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "square";
      x: number;
      y: number;
      length: number;
    };

export function inItDraw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  let existingShape: Shape[] = [];

  if (!ctx) {
    return;
  }

  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let onClicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    onClicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    onClicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;

    existingShape.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (onClicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

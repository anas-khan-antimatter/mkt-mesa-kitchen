import { NextResponse } from "next/server";

// Valid meal IDs from our menu
const VALID_MEAL_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MAX_SELECTIONS = 3;
const MIN_SERVINGS = 1;
const MAX_SERVINGS = 6;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.mealIds || !Array.isArray(body.mealIds)) {
      return NextResponse.json(
        { error: "mealIds must be an array of meal IDs." },
        { status: 400 }
      );
    }

    if (typeof body.servings !== "number" || body.servings < MIN_SERVINGS || body.servings > MAX_SERVINGS) {
      return NextResponse.json(
        { error: `servings must be a number between ${MIN_SERVINGS} and ${MAX_SERVINGS}.` },
        { status: 400 }
      );
    }

    // Validate meal count
    if (body.mealIds.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one meal." },
        { status: 400 }
      );
    }

    if (body.mealIds.length > MAX_SELECTIONS) {
      return NextResponse.json(
        { error: `You can select a maximum of ${MAX_SELECTIONS} meals per box.` },
        { status: 400 }
      );
    }

    // Validate each meal ID
    const invalidIds = body.mealIds.filter(
      (id: number) => !VALID_MEAL_IDS.includes(id)
    );
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid meal IDs: ${invalidIds.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate no duplicates
    const uniqueIds = [...new Set(body.mealIds)];
    if (uniqueIds.length !== body.mealIds.length) {
      return NextResponse.json(
        { error: "Duplicate meal IDs are not allowed." },
        { status: 400 }
      );
    }

    // Calculate price
    const servings = body.servings;
    const mealCount = body.mealIds.length;
    const pricePerMeal = 11.99;
    const total = (mealCount * pricePerMeal * servings).toFixed(2);

    // Success response
    return NextResponse.json({
      success: true,
      message: "Plan saved! Your first box ships Sunday. ✓",
      data: {
        mealIds: body.mealIds,
        servings,
        mealCount,
        total: parseFloat(total),
        currency: "USD",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON with mealIds array and servings number." },
      { status: 400 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
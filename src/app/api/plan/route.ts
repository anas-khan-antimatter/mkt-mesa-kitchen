import { NextRequest, NextResponse } from "next/server";

const MIN_MEALS = 3;
const MAX_MEALS = 8;
const VALID_SERVINGS = [2, 4, 6];
const VALID_MEAL_IDS = [
  "spring-harvest-bowl",
  "tomato-basil-risotto",
  "lemon-herb-chicken",
  "spicy-thai-curry",
  "kale-quinoa-bowl",
  "honey-glazed-salmon",
  "mushroom-truffle-pasta",
  "chipotle-black-bean-tacos",
];

const mealNames: Record<string, string> = {
  "spring-harvest-bowl": "Spring Harvest Bowl",
  "tomato-basil-risotto": "Tomato Basil Risotto",
  "lemon-herb-chicken": "Lemon Herb Chicken",
  "spicy-thai-curry": "Spicy Thai Curry",
  "kale-quinoa-bowl": "Kale & Quinoa Bowl",
  "honey-glazed-salmon": "Honey Glazed Salmon",
  "mushroom-truffle-pasta": "Mushroom Truffle Pasta",
  "chipotle-black-bean-tacos": "Chipotle Black Bean Tacos",
};

const mealPrices: Record<string, number> = {
  "spring-harvest-bowl": 11.99,
  "tomato-basil-risotto": 13.49,
  "lemon-herb-chicken": 14.99,
  "spicy-thai-curry": 12.99,
  "kale-quinoa-bowl": 10.99,
  "honey-glazed-salmon": 16.99,
  "mushroom-truffle-pasta": 14.49,
  "chipotle-black-bean-tacos": 11.49,
};

const SHIPPING = 5.99;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meals: mealIds, servings } = body;

    // Validate meals array
    if (!Array.isArray(mealIds)) {
      return NextResponse.json(
        { error: "meals must be an array of meal IDs" },
        { status: 400 }
      );
    }

    // Validate count
    if (mealIds.length < MIN_MEALS) {
      return NextResponse.json(
        { error: `Select at least ${MIN_MEALS} meals (got ${mealIds.length})` },
        { status: 400 }
      );
    }

    if (mealIds.length > MAX_MEALS) {
      return NextResponse.json(
        { error: `Select at most ${MAX_MEALS} meals (got ${mealIds.length})` },
        { status: 400 }
      );
    }

    // Validate each meal ID
    for (const id of mealIds) {
      if (!VALID_MEAL_IDS.includes(id)) {
        return NextResponse.json(
          { error: `Invalid meal ID: "${id}"` },
          { status: 400 }
        );
      }
    }

    // Validate servings
    if (!VALID_SERVINGS.includes(servings)) {
      return NextResponse.json(
        { error: `Servings must be one of ${VALID_SERVINGS.join(", ")}` },
        { status: 400 }
      );
    }

    // Compute price
    const subtotal = mealIds.reduce((sum, id) => sum + mealPrices[id], 0) * servings;
    const total = subtotal + SHIPPING;

    const mealList = mealIds.map((id) => mealNames[id]).join(", ");

    return NextResponse.json({
      success: true,
      message: `Your box is confirmed! ${mealIds.length} meals × ${servings} servings = $${total.toFixed(2)}. Meals: ${mealList}.`,
      data: {
        meals: mealIds,
        servings,
        subtotal: Math.round(subtotal * 100) / 100,
        shipping: SHIPPING,
        total: Math.round(total * 100) / 100,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// Handle preflight / GET for health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoints: {
      POST: "/api/plan — validate meal plan selection",
    },
  });
}
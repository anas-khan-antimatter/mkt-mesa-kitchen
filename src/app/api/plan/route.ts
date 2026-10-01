import { NextRequest, NextResponse } from "next/server";
import { weeklyMeals } from "@/lib/meals";

const MIN_MEALS = 2;
const MAX_MEALS = 6;
const DELIVERY_FEE = 4.99;
const FREE_DELIVERY_THRESHOLD = 3;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mealIds } = body;

    // Validate input
    if (!mealIds || !Array.isArray(mealIds)) {
      return NextResponse.json(
        { ok: false, error: "mealIds must be an array of meal IDs" },
        { status: 400 }
      );
    }

    if (mealIds.length < MIN_MEALS) {
      return NextResponse.json(
        {
          ok: false,
          error: `Select at least ${MIN_MEALS} meals`,
          min: MIN_MEALS,
          max: MAX_MEALS,
        },
        { status: 400 }
      );
    }

    if (mealIds.length > MAX_MEALS) {
      return NextResponse.json(
        {
          ok: false,
          error: `Select at most ${MAX_MEALS} meals`,
          min: MIN_MEALS,
          max: MAX_MEALS,
        },
        { status: 400 }
      );
    }

    // Validate each ID is a real meal
    const selectedMeals = weeklyMeals.filter((m) => mealIds.includes(m.id));

    if (selectedMeals.length !== mealIds.length) {
      const invalidIds = mealIds.filter(
        (id: number) => !weeklyMeals.some((m) => m.id === id)
      );
      return NextResponse.json(
        { ok: false, error: `Invalid meal IDs: ${invalidIds.join(", ")}` },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = selectedMeals.reduce((sum, m) => sum + m.price, 0);
    const deliveryFee = selectedMeals.length >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    const tags = new Set<string>();
    selectedMeals.forEach((m) => m.tags.forEach((t) => tags.add(t)));

    return NextResponse.json({
      ok: true,
      order: {
        meals: selectedMeals.map((m) => ({
          id: m.id,
          name: m.name,
          price: m.price,
          slug: m.slug,
          tags: m.tags,
        })),
        servings: selectedMeals.length,
        subtotal: Math.round(subtotal * 100) / 100,
        deliveryFee,
        freeDelivery: deliveryFee === 0,
        total: Math.round(total * 100) / 100,
        dietaryProfile: Array.from(tags),
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
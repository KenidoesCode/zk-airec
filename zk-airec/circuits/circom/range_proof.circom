template GroupFromAge() {
    signal input age;
    signal output group;

    // Simple range check for demo: assume age 0-100
    // group 0: age < 20
    // group 1: 20 <= age <= 30
    // group 2: age > 30

    signal is_lt20;
    signal is_20to30;
    signal is_gt30;

    // Calculate boolean values using arithmetic
    var lt20_val = age < 20 ? 1 : 0;
    var gte20_val = age >= 20 ? 1 : 0;
    var lte30_val = age <= 30 ? 1 : 0;
    var gt30_val = age > 30 ? 1 : 0;

    is_lt20 <-- lt20_val;
    is_20to30 <-- gte20_val * lte30_val;
    is_gt30 <-- gt30_val;

    // Ensure exactly one is true
    is_lt20 + is_20to30 + is_gt30 === 1;

    group <-- is_lt20 * 0 + is_20to30 * 1 + is_gt30 * 2;
}

component main = GroupFromAge();

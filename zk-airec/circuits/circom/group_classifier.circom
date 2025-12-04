template GroupClassifier() {
    signal input age;            // private
    signal input pref;           // private (e.g., preference code)
    signal output group;         // public group id: 0,1,2

    // Simplified for circom 0.5.46 compatibility
    // group = age % 3 (basic classification for demo)
    group <-- age % 3;
}

component main = GroupClassifier();

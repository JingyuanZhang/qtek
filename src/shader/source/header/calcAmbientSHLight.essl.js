define(function () {
return "vec3 calcAmbientSHLight(int idx, vec3 N) {\n    int offset = 9 * idx;\n\n        return ambientSHLightCoefficients[0]\n        + ambientSHLightCoefficients[1] * N.x\n        + ambientSHLightCoefficients[2] * N.y\n        + ambientSHLightCoefficients[3] * N.z\n        + ambientSHLightCoefficients[4] * N.x * N.z\n        + ambientSHLightCoefficients[5] * N.z * N.y\n        + ambientSHLightCoefficients[6] * N.y * N.x\n        + ambientSHLightCoefficients[7] * (3.0 * N.z * N.z - 1.0)\n        + ambientSHLightCoefficients[8] * (N.x * N.x - N.y * N.y);\n}";
});
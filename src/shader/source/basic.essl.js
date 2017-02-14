define(function () {
return "@export qtek.basic.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\n\nuniform vec2 uvRepeat : [1.0, 1.0];\nuniform vec2 uvOffset : [0.0, 0.0];\n\nattribute vec2 texcoord : TEXCOORD_0;\nattribute vec3 position : POSITION;\n\nattribute vec3 barycentric;\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec2 v_Texcoord;\nvarying vec3 v_Barycentric;\n\nvoid main()\n{\n    vec3 skinnedPosition = position;\n\n#ifdef SKINNING\n    @import qtek.chunk.skin_matrix\n\n    skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n#endif\n\n    v_Texcoord = texcoord * uvRepeat + uvOffset;\n    v_Barycentric = barycentric;\n\n    gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0);\n}\n\n@end\n\n\n\n\n@export qtek.basic.fragment\n\nvarying vec2 v_Texcoord;\nuniform sampler2D diffuseMap;\nuniform vec3 color : [1.0, 1.0, 1.0];\nuniform vec3 emission : [0.0, 0.0, 0.0];\nuniform float alpha : 1.0;\n\nuniform float lineWidth : 0.0;\nuniform vec3 lineColor : [0.0, 0.0, 0.0];\nvarying vec3 v_Barycentric;\n\n@import qtek.util.edge_factor\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n\n#ifdef RENDER_TEXCOORD\n    gl_FragColor = vec4(v_Texcoord, 1.0, 1.0);\n    return;\n#endif\n\n    gl_FragColor = vec4(color, alpha);\n\n#ifdef DIFFUSEMAP_ENABLED\n    vec4 tex = texture2D(diffuseMap, v_Texcoord);\n\n#ifdef SRGB_DECODE\n    tex.rgb = pow(tex.rgb, vec3(2.2));\n#endif\n\n#if defined(DIFFUSEMAP_ALPHA_ALPHA)\n    gl_FragColor.a = tex.a;\n#endif\n\n    gl_FragColor.rgb *= tex.rgb;\n#endif\n\n    gl_FragColor.rgb += emission;\n    if( lineWidth > 0.01)\n    {\n        gl_FragColor.rgb = gl_FragColor.rgb * mix(lineColor, vec3(1.0), edgeFactor(lineWidth));\n    }\n\n#ifdef GAMMA_ENCODE\n        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1 / 2.2));\n#endif\n\n    gl_FragColor = encodeHDR(gl_FragColor);\n\n}\n\n@end";
});
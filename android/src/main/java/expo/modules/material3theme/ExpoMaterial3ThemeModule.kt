package expo.modules.material3theme

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoMaterial3ThemeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("hello") {
      "Hello world! 👋"
    }
  }
}

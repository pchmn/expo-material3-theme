import ExpoModulesCore

public class ExpoMaterial3ThemeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("hello") {
      return "Hello world! 👋"
    }
  }
}
